import React from 'react';
import GenericContent from './GenericContent';

import script from '!!raw!../marked/Shared/script.js';	//eslint-disable-line import/no-duplicates
import html from '!!html!../marked/Shared/example.html';

import '!!file?name=js/[name].[ext]!../marked/Shared/sharedworker.js';
import '!!file?name=example/shared_worker/index.html!extract!html!extract!pug-html?export=false!../marked/Shared/sharedworker.pug';

import '!!file?name=example/shared_worker/style.css!extract!css!postcss!sass!../scss/worker-display.scss';
import '!!file?name=example/shared_worker/script.js!../marked/Shared/script.js';	//eslint-disable-line import/no-duplicates


class SharedExample extends React.Component {
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
export default SharedExample;
