// sharedworker.js

console.log("INSIDE::starting");

const ports = [];

setInterval(function() {
	for (let port of ports) {
		port.postMessage("PING... " + ports.length + " parents");
	}
}, 5000);

function processMessage(message) {
	return "Message received: " + message;
}


// called on connection from each parent
onconnect = function(event) {
	// always only one port
	const port = event.ports[0];
	ports.push(port);
	
	port.onmessage = function(event) {
		console.log("INSIDE::message", event.data);
		
		// handle string messages
		if(typeof event.data === "string" || event.data instanceof String) {
			// process string message
			const result = processMessage(event.data);
			
			// send result back to the Main thread
			port.postMessage(result);
			return;
		}
		
		switch (event.data.command) {
			// close worker
		case 'CLOSE':
			for (let port of ports) {
				port.postMessage("Closing worker");
			}
			
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
};

onerror = function(error) {
	console.log("INSIDE::onerror", error);
	// error here is a String
	// then it bubbles up to the Main thread in an ErrorEvent
};
