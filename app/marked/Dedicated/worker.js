// worker.js

console.log("INSIDE::starting");

setInterval(function() {
	postMessage("PING...");
}, 5000);

// your function for processing the message
function processMessage(message) {
	return "Message received: " + message;
}

// MessageEvent handler
onmessage = function(event) {
	// let's get a bit more involved setup
	console.log("INSIDE::onmessage", event.data);
	
	// handle string messages
	if(typeof event.data === "string" || event.data instanceof String) {
		// process string message
		const result = processMessage(event.data);
		
		// send result back to the Main thread
		postMessage(result);
		return;
	}
	
	switch (event.data.command) {
		// close worker
	case 'CLOSE':
		postMessage("Closing worker");
		console.log("INSIDE::stopping");
		
		// this queued task gets discarded
		setTimeout(function() {
			console.log("TIMEOUT before close()");
		}, 1000);
		
		close();
		
		console.log("INSIDE::stopped");
		
		// this non-queued task executes
		postMessage("Closed");
		return;
	// signal first message received
	case 'FIRST':
		postMessage("First message");
		// falls through
	case 'PROCESS':
		{
			const result = processMessage(event.data.message);
			postMessage(result);
		}
		return;
	case 'ERROR':
		throw new Error("Some kind of error");
	default:
		postMessage("Unknown message format");
	}
	
};

onerror = function(error) {
	console.log("INSIDE::onerror", error);
	// error here is a String
	// then it bubbles up to the Main thread in an ErrorEvent
};
