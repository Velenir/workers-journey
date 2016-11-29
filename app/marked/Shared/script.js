const input = document.getElementById("input-message");
const output = document.getElementById("output-message");

let sharedWorker;

function onMessageReceived(event) {
	// progressively display sharedWorker's messages
	console.log("OUTSIDE::onmessage", event, "\ndata:", event.data);
		
	output.value += (output.value ? "\n> " : "> ") + event.data;
	
	// autoscroll to bottom
	output.scrollTop = output.scrollHeight;
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
		sharedWorker = new Worker('/js/sharedWorker.js');
		sharedWorker.onmessage = onMessageReceived;
		sharedWorker.onerror = onErrorReceived;
		// indicate that it is the initial message
		command = "FIRST";
	} else {
		command = "PROCESS";
	}
	console.log(`OUTSIDE::posting message with {command: ${command}}`);
	// post the message
	sharedWorker.postMessage({command, message: input.value});
}

function causeError() {
	if(!sharedWorker) {
		console.warn("FIRST CREATE A WORKER");
		return;
	}
	console.log("OUTSIDE::posting message with {command: ERROR}");
	sharedWorker.postMessage({command: "ERROR"});
}

function closeWorker() {
	if(!sharedWorker) {
		console.warn("FIRST CREATE A WORKER");
		return;
	}
	console.log("OUTSIDE::posting message with {command: CLOSE}");
	sharedWorker.postMessage({command: "CLOSE"});
	// allow it to be garbage collected
	sharedWorker = null;
}

function terminateWorker() {
	if(!sharedWorker) {
		console.warn("FIRST CREATE A WORKER");
		return;
	}
	console.log("OUTSIDE::terminating sharedWorker");
	sharedWorker.terminate();
	// allow it to be garbage collected
	sharedWorker = null;
}

function clearOutput() {
	output.value = "";
}
