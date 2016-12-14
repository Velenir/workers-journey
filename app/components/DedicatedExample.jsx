import React from 'react';
import GenericContent from './GenericContent';

import script from '!!raw!../marked/Dedicated/script.js';
import html from '!!html!../marked/Dedicated/example.html';

import '!!file?name=js/[name].[ext]!../marked/Dedicated/worker.js';


class DedicatedExample extends React.Component {
	componentDidMount() {
		if(!this.display) return;
		
		const insertScript = document.createElement("script");
		insertScript.textContent = "(function (arguments) {" + script + "})();";
		this.display.appendChild(insertScript);
	}
	
	render() {
		const {mainClass, links, mark} = this.props.route;
		return (
			<GenericContent route={{mainClass, links, mark}}>
				<div className="worker-display" dangerouslySetInnerHTML={{__html: html}} ref={c => this.display = c}/>
			</GenericContent>
		);
	}
}
export default DedicatedExample;
