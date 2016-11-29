const input = document.getElementById("input-message");
const output = document.getElementById("output-message");

let worker;

function onMessageReceived(event) {
	// progressively display worker's messages
	console.log("OUTSIDE::onmessage", event, "\ndata:", event.data);
		
	output.value += (output.value ? "\n> " : "> ") + event.data;
	
	// autoscroll to bottom
	output.scrollTop = output.scrollHeight;
}

function onErrorReceived(event) {
	console.log("OUTSIDE::onerror", event);
	// progressively display worker's messages
	output.value += (output.value ? "\n! " : "! ") + event.message;
	
	// autoscroll to bottom
	output.scrollTop = output.scrollHeight;
	
	// the error can be prevented from displaying in the console with
	event.preventDefault();
}

function sendInput() {
	let command;
	// create worker if needed
	if(!worker) {
		console.log("OUTSIDE::creating worker");
		worker = new Worker('/js/worker.js');
		worker.onmessage = onMessageReceived;
		worker.onerror = onErrorReceived;
		// indicate that it is the initial message
		command = "FIRST";
	} else {
		command = "PROCESS";
	}
	console.log(`OUTSIDE::posting message with {command: ${command}}`);
	// post the message
	worker.postMessage({command, message: input.value});
}

function causeError() {
	if(!worker) {
		console.warn("FIRST CREATE A WORKER");
		return;
	}
	console.log("OUTSIDE::posting message with {command: ERROR}");
	worker.postMessage({command: "ERROR"});
}

function closeWorker() {
	if(!worker) {
		console.warn("FIRST CREATE A WORKER");
		return;
	}
	console.log("OUTSIDE::posting message with {command: CLOSE}");
	worker.postMessage({command: "CLOSE"});
	// allow it to be garbage collected
	worker = null;
}

function terminateWorker() {
	if(!worker) {
		console.warn("FIRST CREATE A WORKER");
		return;
	}
	console.log("OUTSIDE::terminating worker");
	worker.terminate();
	// allow it to be garbage collected
	worker = null;
}

function clearOutput() {
	output.value = "";
}
