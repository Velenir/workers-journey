# Dedicated Worker

Let's say you have a piece of code you decided to run a in a background thread. Nothing too complicated, you just want some script executed and maybe to pass it new data from time to time. A **Dedicated Worker** is your **Worker** of choice then.

So let's imagine minimalistic code like this:

```js
function processMessage(message) {
	console.log(message);
	return "Message received: " + message;
}
```

And now you want to run this inside a **Worker Thread**. You also want to pass it messages and expect to receive responses. How should you go about it?

---

## Setup

Let's name your **Worker**'s script `worker.js`. To create a **Worker** object you pass a script URL **Worker** constructor.

```js
// Main thread

const worker = new Worker('worker.js');
```

> The script URL must obey [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

Your **Main thread** and **Worker** will be communicating by post. That is:

+ **postMessage** function sends a message.
+ **onmessage** handler receives **MessageEvent**. The message will be in **event.data**.

```js
// Main thread

// create a worker, it starts immediately
const worker = new Worker('worker.js');

// connect message handler
worker.onmessage = function(event) {
	console.log(`Received | ${event.data} | from worker`);
}
// OR like this
worker.addEventListener('message', function(event) {...})

// post a message
worker.postMessage("Initial message");
```

Inside of the **Worker** setup is almost identical.

```js
// worker.js

// your function for processing the message
function processMessage(message) {
	console.log(message);
	return "Message received: " + message;
}

// MessageEvent handler
onmessage = function(event) {
	const result = processMessage(event.data);
	
	// send result back to the Main thread
	postMessage(result);
};
// OR
addEventListener('message', function(event) {...});
```

> **Workers** run in a separate global context, which is similar but has different functions available than **window** of the **UI thread**
> A **Worker**'s global scope can be accessed through **self** object, and like with **window** all global functions and variables are attached to it. Therefore inside a worker `self === this`, `self.onmessage === onmessage`, `self.postMessage === postMessage` as well as any other function or variable you create.

---

## Error handling

What if something goes wrong and the script inside of a **Worker** throws an Error. There is an `onerror` handler available in both **Worker thread** and **Main thread** for catching **ErrorEvent**s.

An **ErrorEvent** bubbles through the **Worker** and to the **Main thread**.

```js
// worker

onerror = function(errorMessage) {
	// error here is a String
	// then it bubbles up to the Main thread as an ErrorEvent
}
```

In the **Main thread** properties of interest on the **ErrorEvent** are:

+ **message** - the human-readable error description, same as errorMessage in the **Worker**.
+ **filename** - the name of the script file where the error happened.
+ **lineno** - the line where the error happened.

```js
// Main thread

worker.onerror = function(event) {
	console.warn(`Error: ${event.message} in ${event.filename} on line ${event.lineno}`);
	
	// the error can be prevented from displaying in the console with
	event.preventDefault();
}
```

---

Now you have a worker set up. You can send it messages, receive responses and be happy about. But what about when you're done with the worker, do you just let it be or do you stop it?

While starting a new worker on demand isn't exactly costly, it takes more time than simply passing a message with new data[^1]. So the main point is

> Reuse workers rather than start a new one for each operation.

[^1]: [How fast are web workers? ★ Mozilla Hacks](https://hacks.mozilla.org/2015/07/how-fast-are-web-workers/)

But if you don't intend to use a worker anymore it is a good idea to stop the thread to save browser resources.

---

## Stopping a Worker

A **Worker** can be stopped from inside its thread by calling `close()` (`self.close()`) and from outside (on the **Main thread**) by calling `worker.terminate()`.

+ After calling `self.close()` **Worker** discards all tasks enqueued in its event loop.
+ After calling `worker.terminate()` **Worker** terminates immediately without opportunity to clean up after itself. If that is undesirable consider posting a message to the worker indicating for it to finish up and call `close()`;

After the **Worker** has been stopped it can't be restarted. You will have to recreate it with `worker = new Worker('worker.js')`.

```js
// Main thread
// ...

worker.postMessage({command: "close"});
```

```js
// worker

onmessage = function(event) {
	switch (event.data.command) {
		case "close":
			// finish up
			postMessage("Closing worker");
			// ...
			
			close();
			return ;
		default:
			// process data
			return;
	}
}
```

With general description out of the way it is time we looked at an actual worker in action.
