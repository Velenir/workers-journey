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


class GenericWorkerExample extends React.Component {
	constructor(props) {
		super(props);
		
		switch(props.route.link_title) {
		case "Dedicated Worker Example":
			this.script = scriptDedicated;
			this.html = htmlDedicated;
			break;
		case "Shared Worker Example":
			this.script = scriptShared;
			this.html = htmlShared;
			break;
		default:
			this.script = "";
			this.html = "";
		}
	}
	
	componentDidMount() {
		if(!this.display) return;
		
		const insertScript = document.createElement("script");
		insertScript.textContent = "(function (arguments) {" + this.script + "})();";
		this.display.appendChild(insertScript);
	}
	
	render() {
		const {mainClass, links, mark} = this.props.route;
		return (
			<GenericContent route={{mainClass, links, mark}}>
				<div className="worker-display" dangerouslySetInnerHTML={{__html: this.html}} ref={c => this.display = c}/>
			</GenericContent>
		);
	}
}
export default GenericWorkerExample;
