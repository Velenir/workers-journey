import React from 'react';

import 'style!css!highlight.js/styles/github.css';

function addLineNumbers(el) {
	console.log("adding line-numbers to", el);
	el.parentNode.classList.add("line-numbers");
	
	const lines = el.textContent.match(/\n/g).length;
	console.log("found", lines, "lines");
	
	const linesRow = document.createElement("span");
	linesRow.classList.add("line-numbers__row");
	
	for (let i = 0; i < lines; ++i) {
		linesRow.appendChild(document.createElement("span"));
	}
	
	
	el.appendChild(linesRow);
}

class Marked extends React.Component {
	componentDidMount() {
		for (let el of this.marked.querySelectorAll("[class*=language-]")) {
			addLineNumbers(el);
		}		
	}
	
	render() {
		return (
			<div className="markdown" dangerouslySetInnerHTML={{__html: this.props.mark}} ref={c => this.marked = c}/>
		);
	}
}


// const Marked = ({mark}) => (
// 	<div className="markdown" dangerouslySetInnerHTML={{__html: mark}}/>
// );

export default Marked;
