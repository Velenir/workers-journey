const input = document.getElementById("input-message");
const output = document.getElementById("output-message");

document.getElementById("sendInput").onclick = sendInput;
document.getElementById("causeError").onclick = causeError;
document.getElementById("closeWorker").onclick = closeWorker;
document.getElementById("closePort").onclick = closePort;
document.getElementById("clearOutput").onclick = clearOutput;

let sharedWorker;

function onMessageReceived(event) {
	// progressively display sharedWorker's messages
	console.log("OUTSIDE::onmessage", event, "\ndata:", event.data);
		
	output.value += (output.value ? "\n> " : "> ") + event.data;
	
	// autoscroll to bottom
	output.scrollTop = output.scrollHeight;
	
	if(sharedWorker && event.data === "Closing worker") {
		// worker closed itself (e.g. after receiving "CLOSE" command from another parent)
		// allow it to be garbage collected
		sharedWorker = null;
	}
}

function onErrorReceived(event) {
	console.log("OUTSIDE::onerror", event);
	// progressively display sharedWorker's messages
	output.value += (output.value ? "\n! " : "! ") + event.message;
	
	// autoscroll to bottom
	output.scrollTop = output.scrollHeight;
	
	// the error can be prevented from displaying in the console with
	event.preventDefault();
}

function sendInput() {
	let command;
	// create sharedWorker if needed
	if(!sharedWorker) {
		console.log("OUTSIDE::creating sharedWorker");
		sharedWorker = new SharedWorker('/js/sharedworker.js');
		sharedWorker.port.onmessage = onMessageReceived;
		sharedWorker.onerror = onErrorReceived;
		// indicate that it is the initial message
		command = "FIRST";
	} else {
		command = "PROCESS";
	}
	console.log(`OUTSIDE::posting message with {command: ${command}}`);
	// post the message
	sharedWorker.port.postMessage({command, message: input.value});
}

function causeError() {
	if(!sharedWorker) {
		console.warn("FIRST CREATE A WORKER");
		return;
	}
	console.log("OUTSIDE::posting message with {command: ERROR}");
	sharedWorker.port.postMessage({command: "ERROR"});
}

function closeWorker() {
	if(!sharedWorker) {
		console.warn("FIRST CREATE A WORKER");
		return;
	}
	console.log("OUTSIDE::posting message with {command: CLOSE}");
	sharedWorker.port.postMessage({command: "CLOSE"});
	// allow it to be garbage collected
	sharedWorker = null;
}

function closePort() {
	if(!sharedWorker) {
		console.warn("FIRST CREATE A WORKER");
		return;
	}
	console.log("OUTSIDE::closing port");
	sharedWorker.port.close();
	// allow the worker to be garbage collected, port can't be reopened anyway
	sharedWorker = null;
}

function clearOutput() {
	output.value = "";
}
