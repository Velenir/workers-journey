import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import sharedExampleMark from '../marked/Shared/SharedExample.md';
import script from '!!raw!../marked/Shared/script.js';
import html from '!!html!../marked/Shared/example.html';

import '!!file?name=js/[name].[ext]!../marked/Shared/sharedworker.js';


class SharedExample extends React.Component {
	componentDidMount() {
		const replaceScript = this.display.querySelector("#main-thread__script");
		if(!replaceScript) return;
		
		const newScript = document.createElement("script");
		newScript.textContent = script;
		this.display.replaceChild(newScript, replaceScript);
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
