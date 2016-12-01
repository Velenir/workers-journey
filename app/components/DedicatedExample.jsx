import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import dedicatedExampleMark from '../marked/Dedicated/DedicatedExample.md';
import script from '!!raw!../marked/Dedicated/script.js';
import html from '!!html!../marked/Dedicated/example.html';

import '!!file?name=js/[name].[ext]!../marked/Dedicated/worker.js';


class DedicatedExample extends React.Component {
	componentDidMount() {
		const parentScript = document.createElement("script");
		parentScript.textContent = "(function (arguments) {" + script + "})();";
		this.display.appendChild(parentScript);
	}
	
	render() {
		return (
			<div className="app__content__main worker-dedicated--example">
				<Marked mark={dedicatedExampleMark}/>
				<div className="worker-display" dangerouslySetInnerHTML={{__html: html}} ref={c => this.display = c}/>
				<div className="steps-navigation">
					<Link to="/dedicated_worker" className="arrow" title="Dedicated Worker"/>
					<Link to="/shared_worker" className="arrow" title="Shared Worker"/>
				</div>
			</div>
		);
	}
}
export default DedicatedExample;
