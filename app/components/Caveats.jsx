import React from 'react';
import GenericContent from './GenericContent';


export default class Caveats extends React.Component {
	componentDidMount() {
		const script = document.createElement("script");
		script.id = "caniuse-embed";
		script.src = "//cdn.jsdelivr.net/caniuse-embed/1.0.1/caniuse-embed.min.js";
		
		const oldScript = document.getElementById("caniuse-embed");
		
		if(oldScript) {
			oldScript.parentNode.replaceChild(script, oldScript);
		} else {
			document.body.appendChild(script);
		}
	}
	
	render() {
		const {mainClass, links, mark} = this.props.route;
		return (
			<GenericContent route={{mainClass, links, mark}}/>
		);
	}

}
