import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import sharedExampleMark from '../marked/Shared/SharedExample.md';
import script from '!!raw!../marked/Shared/script.js';	//eslint-disable-line import/no-duplicates
import html from '!!html!../marked/Shared/example.html';

import '!!file?name=js/[name].[ext]!../marked/Shared/sharedworker.js';
import '!!file?name=example/shared_worker/index.html!extract!html!extract!pug-html?export=false!../marked/Shared/sharedworker.pug';

import '!!file?name=example/shared_worker/style.css!extract!css!postcss!sass!../scss/worker-display.scss';
import '!!file?name=example/shared_worker/script.js!../marked/Shared/script.js';	//eslint-disable-line import/no-duplicates


class SharedExample extends React.Component {
	componentDidMount() {		
		const parentScript = document.createElement("script");
		parentScript.textContent = "(function (arguments) {" + script + "})();";
		this.display.appendChild(parentScript);
	}
	
	render() {
		return (
			<div className="app__content__main worker-shared--example">
				<Marked mark={sharedExampleMark}/>
				<div className="worker-display" dangerouslySetInnerHTML={{__html: html}} ref={c => this.display = c}/>
				<div className="steps-navigation">
					<Link to="/shared_worker" className="arrow" title="Shared Worker"/>
					<Link to="/worker_scope" className="arrow" title="Worker Scope"/>
				</div>
			</div>
		);
	}
}
export default SharedExample;
