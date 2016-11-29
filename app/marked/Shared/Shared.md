# Shared Worker

What if you have need for the same code to be executed in its own thread across many pages of your site. Creating `new Worker('worker.js')` on every page would surely be a waste (unless you actually need a whole new background thread). A **Shared Worker** can do that.

You create it with:

```js
const sharedWorker = new SharedWorker('sharedworker.js');
```

in any script you would like to access it from, be it a browser window, tab, an iframe or another worker. Now all those scripts can utilize the same worker, the same thread for their computational needs.

> Browser contexts sharing a **Worker** must share the same origin ([same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)).

---

## Differences from Dedicated Worker

The major difference is in the way you communicate with a **Shared Worker** - through its `port` object. Also, the `port` connection has to first be established both in the **Main thread** and in the **Worker thread**.

### port.onmessage

The connection can be established either implicitly by assigning to `onmessage` event handler:

```js
// Parent thread
sharedWorker.port.onmessage = function() {...};
```

And after receiving connection inside the **Shared Worker**:

```js
// Worker thread

// called on connection from each Parent thread
onconnect = function(e) {
	// always only one port
	const port = e.ports[0];
	
	port.onmessage = function() {...};
};
```

or by calling `start()` on the `port`:

```js
// Parent thread
// this doesn't establish a connection
sharedWorker.port.addEventListener('message', function() {...});

sharedWorker.port.start();
```

```js
// Worker thread

// called on connection from each Parent thread
onconnect = function(e) {
	// always only one port
	const port = e.ports[0];
	
	// this doesn't establish a connection
	port.addEventListener('message', function() {...});

	port.start();
};
```

### port.postMessage, port.close

Posting messages is also done through the port: `port.postMessage`.

`port.close()` closes only the communication port.

### Stopping Shared Worker

`sharedWorker.terminate()` terminates only disconnects current sharedWorker form the **Parent thread**. The **Worker thread** will stop when all **Parent threads** have called terminate or been stopped themselves (page closed, etc.), the **Worker** itself calls `self.close()`.

### Communicating between parents

You can even `postMessage` to all the parents of a **SharedWorker** if you keep track of `port`s that connect to it.

```js
// Worker thread

const ports= [];

onconnect = function(e) {
	const port = e.ports[0];
	ports.push(port);
	
	port.onmessage = function(e) {
		// process e.data
		
		for (let parentPort of ports) {
			if(parentPort !== port) {
				parentPort.postMessage(...);
			}
		}
		
		port.postMessage("DONE");
	};
};
```

> If you just want pages/tabs/iframes of the same origin to communicate it would be easier to use [BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel). For main document and iframes inside it (all on the same page) [MessageChannel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel) is enough.

---

## Separate thread per Shared Worker

What if you would like some pages of your site to share  a **Worker** and some other pages to share another **Worker**, but create them from the same script. Or parallelize calculations by creating more distinct **Shared Workers** with the same script.

You can do that by passing a second parameter  to **ServiceWorker** constructor -- the name of a separate **Worker thread**.

```js
// Parent thread, script 1

const sharedWorker1 = new SharedWorker('sharedworker.js', "worker1");
const sharedWorker2 = new SharedWorker('sharedworker.js', "worker2");
```

```js
// Parent thread, script 2

const sharedWorker1 = new SharedWorker('sharedworker.js', "worker1");
const sharedWorker2 = new SharedWorker('sharedworker.js', "worker2");
```

Now there are two workers running, executing the same script and shared between two parents.

On to a working example we go.

---
