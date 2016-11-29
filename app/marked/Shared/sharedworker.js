// sharedworker.js

console.log("INSIDE::starting");

const ports = [];

setInterval(function() {
	for (let port of ports) {
		port.postMessage("PING...");
	}
}, 5000);

function processMessage(message) {
	return "Message received: " + message;
}


// called on connection from each Parent thread
onconnect = function(e) {
	console.log("INSIDE::onconnect", e);
	console.log("INSIDE::ports", e.ports);
	
	// always only one port
	const port = e.ports[0];
	
	port.onmessage = function(e) {
		console.log("INSIDE::onmessage", e);
		console.log("INSIDE::message", e.data);
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
			port.postMessage("Closing worker");
			console.log("INSIDE::stopping");
			
			close();
			return;
		// signal first message received
		case 'FIRST':
			port.postMessage("First message");
			// falls through
		case 'PROCESS':
			{
				const result = processMessage(event.data.message);
				port.postMessage(result);
			}
			return;
		case 'ERROR':
			throw new Error("Some kind of error");
		default:
			port.postMessage("Unknown message format");
		}
	};
	
	port.onerror = function(error) {
		console.log("INSIDE::onerror", error);
		// error here is a String
		// then it bubbles up to the Main thread in an ErrorEvent
	};
};
