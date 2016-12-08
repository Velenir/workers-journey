# Inlining (embedding) Workers

Untill now we have created workers by calling the constructor with an URL to a script file:
`const worker = new Worker("worker.js");`

But **Worker** constructor also accepts valid strings containing URL representation of a script that are created by `URL.createObjectURL` and `FileReader.readAsDataURL`.

`URL.createObjectURL(blob)` takes a [**Blob**](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object or a [**File**](https://developer.mozilla.org/en-US/docs/Web/API/File) object (which inherits from **Blob**). That means that you can construct a **Blob** from a string (`new Blob(["string"])`), create an objectURL from it and instantiate a **Worker**.

> When you no longer need an `objectURL` created with `URL.createObjectURL(blob)`, you can release it with `URL.revokeObjectURL(objectURL)` to free the memory.

Or use a **FileReader** to read a dataURI from a dynamically loaded **File** (e.g. submitted by the user in `<input type="file">`) and pass it to **Worker** constructor.

A **Blob** can be constructed from an array of **ArrayBuffer**, **ArrayBufferView** (TypedArray or DataView), **Blob** objects or strings.

To give a simple example:

```js
// Parent thread
const str = `
	onmessage = function(event) {
		console.log("INSIDE::onmessage", event.data);
		postMessage("Message received: " + event.data);
	}
`;

const blob = new Blob([str]);

const blobURL = URL.createObjectURL(blob);

const worker = new Worker(blobURL);

// can release if don't intend to create any more Workers from it
URL.revokeObjectURL(blobURL);

worker.onmessage = function(event) {
	console.log("OUTSIDE::onmessage", event, "\ndata:", event.data);
};

worker.postMessage("Initial message");
```

For convenience's sake it is possible to inline **Worker** code in page markup:

```html
<script type="text/js-worker">
	onmessage = function(event) {
		console.log("INSIDE::onmessage", event.data);
		postMessage("Message received: " + event.data);
	}
</script>
```

It is important to assign something other than `text/javascript` to `type` of the `<script>`, otherwise it will be parsed by the JS engine and executed.

Later you can use the `<script>`'s `textContent` to create a **Blob**:

```js
// Main thread
const str = document.querySelector("script[type='text/js-worker']").textContent;
const blob = new Blob([str]);
// ...
```

## importScripts

Inside a **Worker** importScripts accepts the same `objectURL` and `dataURI` created from a **Blob**. Therefore it is possible to send a string (or a **Blob**, or even a **Transferable** ArrayBuffer to later be turned into `dataURI` with `FileReaderSync.readAsDataURL`) with additional functions and variables from the **Parent thread** to extend the **Worker** functionality on demand (as you remember **importScripts** adds to the global scope).

---
