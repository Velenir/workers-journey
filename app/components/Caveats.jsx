import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import caveatsMark from '../marked/Caveats/Caveats.md';


export default class Caveats extends React.Component {
	componentDidMount() {
		const script = document.createElement("script");
		script.src = "//cdn.jsdelivr.net/caniuse-embed/1.0.1/caniuse-embed.min.js";
		document.body.appendChild(script);
	}
	
	render() {
		return (
			<div className="app__content__main caveats">
				<Marked mark={caveatsMark}/>
				<div className="steps-navigation">
					<Link to="inlining_workers" className="arrow" title="Inlining Workers"/>
					<Link to="info" className="arrow" title="Info"/>
				</div>
			</div>
		);
	}

}
