import React from 'react';

import Menu from './Menu';


export default class App extends React.Component {
	render() {
		return (
			<div className="app">
				<Menu/>
				<div className="app__content">
					{this.props.children}
				</div>
				
			</div>
		);
	}
}
