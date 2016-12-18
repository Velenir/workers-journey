import React from 'react';

import {pages} from '../helpers/routemap';

function constructLists(pages, separators) {
	separators = new Set(separators);
	
	const lists = [[]];
	
	for (let i = 0, lastArray = lists[0], len = pages.length; i < len; ++i ) {
		const {path, menu_item, link_title = menu_item} = pages[i];
		
		if(i > 0 && separators.has(link_title)) {
			lists.push(lastArray = [{path, link_title}]);
		}
		else {
			lastArray.push({path, link_title});
		}
	}
	
	return lists;
}


export default class Footer extends React.Component {
	goToLink = (e) => {
		this.props.history.push(e.target.getAttribute("href"));
		e.preventDefault();
	}
	
	fillLinks() {
		return constructLists(pages, ["Worker Types", "Worker Scope", "Resources"])
		.map((list, i) => (
			<ul key={i} className="site-map site-map--pages">
				{list.map(({path, link_title}, i) => (
					<li key={i}>
						<a href={path} onClick={this.goToLink}>{link_title}</a>
					</li>
				))}
			</ul>
		));
	}
	
	render() {
		return (
			<div className="main-footer__links site-map">
				{this.fillLinks()}
				<ul className="site-map site-map--credits">
					<li>Worker's Journey by <a href="">Velenir</a></li>
					<li>Code available on <a href="">GitHub</a></li>
				</ul>
			</div>
		);
	}
}
