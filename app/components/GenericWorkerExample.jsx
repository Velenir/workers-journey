import React from 'react';
import GenericContent from './GenericContent';

// importDedicatedWorker resources
import scriptDedicated from '!!raw!../marked/Dedicated/script.js';
import htmlDedicated from '!!html!../marked/Dedicated/example.html';

import '!!file?name=js/[name].[ext]!../marked/Dedicated/worker.js';


// import SharedWorker resources
import scriptShared from '!!raw!../marked/Shared/script.js';	//eslint-disable-line import/no-duplicates
import htmlShared from '!!html!../marked/Shared/example.html';

import '!!file?name=js/[name].[ext]!../marked/Shared/sharedworker.js';
import '!!file?name=example/shared_worker/index.html!extract!html!extract!pug-html?export=false!../marked/Shared/sharedworker.pug';

import '!!file?name=example/shared_worker/style.css!extract!css!postcss!sass!../scss/worker-display.scss';
import '!!file?name=example/shared_worker/script.js!../marked/Shared/script.js';	//eslint-disable-line import/no-duplicates


export default class GenericWorkerExample extends React.Component {
	constructor(props) {
		super(props);
				
		this.determineState();
	}
	
	determineState(link_title = this.props.route.link_title) {
		let script, html;
		
		switch(link_title) {
		case "Dedicated Worker Example":
			script = scriptDedicated;
			html = htmlDedicated;
			break;
		case "Shared Worker Example":
			script = scriptShared;
			html = htmlShared;
			break;
		default:
			script = "";
			html = "";
		}
		
		this.state ={html, script};
	}
	
	addScript() {
		if(!this.display) return;
		
		const insertScript = document.createElement("script");
		insertScript.textContent = "(function (arguments) {" + this.state.script + "})();";
		this.display.appendChild(insertScript);
	}
	
	stopWorker() {
		// close connection to SharedWorker or stop DedicatedWorker when leaving the page
		const stopWorkerBtn = document.getElementById("closePort") || document.getElementById("terminateWorker");
		if(stopWorkerBtn) stopWorkerBtn.click();
	}
	
	componentDidMount() {
		this.addScript();
	}
	
	componentWillUnmount() {
		this.stopWorker();
	}
	
	componentDidUpdate() {
		this.addScript();
	}
	componentWillUpdate() {
		this.stopWorker();
	}
	componentWillReceiveProps({route: {link_title}}) {		
		if(link_title !== this.props.route.link_title) {
			this.determineState(link_title);
		}
	}
	
	render() {
		return (
			<GenericContent {...this.props.route}>
				<div className="worker-display" dangerouslySetInnerHTML={{__html: this.state.html}} ref={c => (console.log("reref", c),this.display = c)}/>
			</GenericContent>
		);
	}
}
