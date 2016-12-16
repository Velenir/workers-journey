import React from 'react';

import {pages} from '../helpers/routemap';

export default class Footer extends React.Component {
	goToLink = (e) => {
		this.props.history.push(e.target.getAttribute("href"));
		e.preventDefault();
	}
	render() {
		return (
			<ul>
				{pages.map(({path, menu_item, link_title = menu_item}, i) => (
					<li key={i}>
						<a href={path} onClick={this.goToLink}>{link_title}</a>
					</li>
				))}
			</ul>
		);
	}
}
