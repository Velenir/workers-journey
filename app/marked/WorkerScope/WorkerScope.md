# Worker Scope

So what is a **Worker** capable of? What does it have access to?

First of all, as it isn't run on the **UI thread** anything UI specific isn't available to it - that is **DOM** and therefore **document** can't be manipulated from inside a **Worker thread**.

Fortunately most other methods you would usually find on **window** global object in browser have their analogues on **self** global object in a **Worker**.

**self** is a reference to a specialized version of **WorkerGlobalScope**:
+ **DedicatedWorkerGlobalScope** in a **Dedicated Worker**,
+ **SharedWorkerGlobalScope** in a **Shared Worker**,
+ **ServiceWorkerGlobalScope** in a **Service Worker**.

Aside from the methods you've already seen in action:
+ **postMessage** for handling **Worker thread** - **Parent thread** communication
+ **onmessage** handler
+ **onerror** handler
+ **close** for closing the **Worker** instance

**Workers** have access to
+ standard [JavaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) (String, Array, Object, Math, etc.),
+ timers (**setTimeout**, **setInterval**, **clearTimeout**, **clearInterval**)
+ [**console**](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/console) that provides access to your browser console
+ **importScripts**, that synchronously imports scripts to **Worker**'s scope
+ [**Broadcast Channel API**](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) and [**Channel Message API**](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API) for communicating between different browser contexts
+ [**Cache API**](https://developer.mozilla.org/en-US/docs/Web/API/Cache) for controlling Cache storage, which is especially useful in a **Service Worker**
+ [**XMLHttpRequest**](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and [**Fetch API**](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for making AJAX requests
+ [**FileReader**](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) and [**FileReaderSync**](https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync) for reading file contents on user computer

and many other functions and classes.

The full list of Functions and Classes available to **Web Workers** can be viewed at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers). Since all these functions and classes are in the global scope, they can be reached via `self.methodName`, as well as just `methodName`.

---

## postMessage

Let's discuss **postMessage** in more detail. Its signature is:

`postMessage(aMessage, transferList)`

, where
+ **aMessage** is the object to transfer to or from a **Worker**,
+ **transferList**  is an optional array of **Transferable** objects to transfer ownership of.

When you send a **aMessage**, the **Worker** actually gets a copy of it, made through a process called [**Structured Clone Algorithm**](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is a serialization mechanism similar to JSON. It has following advantages over JSON:
+ can duplicate **RegExp**, **Blob**, **File**, **FileList** and **ImageData**
+ supports objects with cyclic refrences (whereas JSON would just stringify the object every time it encounters a reference to it)

It can't duplicate **Function** and **Error** objects, also the prototype chain isn't duplicated.

A major implication of this is that the only way to pass a function to a **Worker** is to coerce it `toString()` and then process with `eval(str)` or `new Function(str)` after transfer.

What you have to keep in mind, though, is performance -- transferring a lone string is much faster than transferring an object[^1][^2]. Therefore, if your use case doesn't require sending object types mentioned above or you can reconstruct them from strings reasonably fast (e.g. sending **RegExp** pattern and flags separately and to combine them in `new RegExp(pattern, flags)` later), it would be much more performant to serialize **aMessage** with `JSON.stringify` before and deserialize with `JSON.parse` after.

[^1]: [High-performance Web Worker messages](https://nolanlawson.com/2016/02/29/high-performance-web-worker-messages/)
[^2]: [Worker Performance Tests](https://runspired.github.io/webworker-performance/)

Another performance boost, especially for large volumes of data, can be obtained by sending over a **Transferable** object. In that case the sending thread transfers ownership of the **Transferable** and can no longer access it.
A **Transferable** can be an  **ArrayBuffer**, **ImageBitmap** or **MessagePort**. Which means this can be utilized when sending results of `FileReader.readAsArrayBuffer`, `ImageBitmapFactories.createImageBitmap` (and [**OffscreenCanvas**](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) when it gain more support) and **BSON** (binary JSON).

To illustrate:

```js
const buffer  = new ArrayBuffer(1024*1024*32);	// 32MB
const array = Uint8Array(buffer);

for (let i = 0; i < array.length; ++i) {
  array[i] = i;
}

worker.postMessage(array.buffer, [array.buffer]);

// after transferring ownership
console.log(array.byteLength === 0);	// true
```

As you can see, after the transfer the buffer becomes empty. It indicates that it was not copied to/from the **Worker** but rather moved there wholesale (you can think of it as `std::move` in C++ if that helps).

When sending a **Transferable** the important part is to include it in the **transferList** and to pass a reference to it (or a TypedArray view of it) as part of **aMessage**. So if, for example, you want to send an object and a **Transferable** as part of that object, then you could use something along these lines:

```js
postMessage(
	{
		// properties...
		uint8Array: uint8Array,
		anotherBuffer: buffer2
		// other properties...
	}, [array.buffer]
);
```

The buffer then could be picked up in:

```js
onmessage = function(event) {
	const uint8Array = event.data.uint8Array;
	const buffer2 = event.data.anotherBuffer;
	
	const int8Array = new Int8Array(buffer2);
};
```

---

## importScripts

A **Worker** can import other scripts into its **global scope** and through it extend its functionality. Such scripts can be loaded both from local and remote locations.

The scripts listed in `importScripts("script1.js", "script2.js", ...)` will be downloaded in parallel but executed in **global scope** synchronously in the given order. If the script fails to load, NETWORK_ERROR is thrown.

For example, given:

```js
// local.js
function helpFunction() {
	// ...
}

const GLOBALS = {
	prop: "property"
};
```

```js
// example.com/remotelib.js
function  libFunction() {
	// ...
}
```

```js
// inside worker
importScripts("local.js", "//example.com/remotelib.js");

// now the global objects from the scripts will be accessible
helpFunction();
const prop = GLOBALS.prop;

libFunction();
```

To stress that scripts will be executed in **global scope** consider:

```js
// Parent thread
worker.postMessage({importURL: "local.js"});
```

```js
// inside worker
onmessage = function(event) {
	importScripts(event.importURL);
	// "local.js" is executed in global scope
	// helpFunction and GLOBALS are available everywhere
	helpFunction();
	const prop = GLOBALS.prop;
};

helpFunction();
const prop = GLOBALS.prop;
```
In the manner of its importing mechanism **importScripts** is similar to `<script src="path/to/file.js">` injection -- script content gets added to the page/worker and executed in global scope. It is even possible to make JSONP requests with **importScripts**.

```js
// inside worker
importScripts("//example.com/path/to/jsonp?callback=handleResult");

// gets executed with the request's results
function handleResult(jsonpData) {
	// ...
}
```
