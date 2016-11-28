// sharedworker.js

console.log("INSIDE::starting");

// MessageEvent handler
onmessage = function(event) {
	console.log("INSIDE::received MessageEvent", event.data);
};

onerror = function(error) {
	console.log("INSIDE::caught Error", error);
	// error here is a String
	// then it bubbles up to the Main thread as an ErrorEvent
};
