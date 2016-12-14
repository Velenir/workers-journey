import React from 'react';
import GenericContent from './GenericContent';


export default class Caveats extends React.Component {
	componentDidMount() {
		const script = document.createElement("script");
		script.src = "//cdn.jsdelivr.net/caniuse-embed/1.0.1/caniuse-embed.min.js";
		document.body.appendChild(script);
	}
	
	render() {
		const {mainClass, links, mark} = this.props.route;
		return (
			<GenericContent route={{mainClass, links, mark}}/>
		);
	}

}
