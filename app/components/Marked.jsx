import React from 'react';

import 'style!css!highlight.js/styles/github.css';

function addLineNumbers(el) {
	el.parentNode.classList.add("line-numbers");
	
	const lines = el.textContent.split("\n").length - 1;
	
	const linesRow = document.createElement("span");
	linesRow.classList.add("line-numbers__row");
	
	for (let i = 0; i < lines; ++i) {
		linesRow.appendChild(document.createElement("span"));
	}
	
	
	el.appendChild(linesRow);
}

class Marked extends React.Component {
	markCodeBlocks = () => {
		for (let el of this.marked.querySelectorAll("[class*=language-]")) {
			addLineNumbers(el);
		}
	}
	
	componentDidMount() {
		this.markCodeBlocks();
	}
	
	componentDidUpdate() {
		this.markCodeBlocks();
	}
	
	render() {
		return (
			<div className="markdown" dangerouslySetInnerHTML={{__html: this.props.mark}} ref={c => this.marked = c}/>
		);
	}
}

export default Marked;
