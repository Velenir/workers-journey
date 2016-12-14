import React from 'react';
import NavLink from './NavLink';

import {pages} from '../helpers/routemap';

// const Menu = () => (
// 	<nav className="app__menu">
// 		<ul className="app__menu__list">
// 			<li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/">Home</NavLink></li>
// 			<li className="app__menu__item"><NavLink to="info">Info</NavLink></li>
// 			<li className="app__menu__item"><NavLink to="about">About</NavLink></li>
// 		</ul>
// 	</nav>
// );

class Menu extends React.Component {
	constructor() {
		super();
		
		this.state = {
			menuState: "closed"
		};
	}
	
	openCloseMenu = () => {
		this.setState({
			menuState: this.state.menuState === "open" ? "closed" : "open"
		});
	}
	
	render() {
		
		// const menuItems = pages.map(({path, menu_item}, i) => {
		// 	return <li className="app__menu__item" key={i}><NavLink onlyActiveOnIndex={true} to={path}>{menu_item}</NavLink></li>;
		// });
		let lastDepth = 1, nestLevel = 0, fillingArray;
		const menuItems = pages.reduce((prev, {path, menu_item, visNested}, i, a) => {
			const currentDepth = path.split("/").length - 1;
			
			if(!fillingArray) fillingArray = prev;
			if(currentDepth > lastDepth || visNested) {
				console.log("DEEPER", currentDepth - lastDepth);
				// prev.push(fillingArray = []);
				// fillingArray = prev[prev.length - 1];
				// let arrDepth = nestLevel - 1;
				// while(--arrDepth) {
				// 	fillingArray = fillingArray[fillingArray.length - 1];
				// }
				
				
				let arrDepth = currentDepth - lastDepth;
				nestLevel += arrDepth;
				while(arrDepth--) {
					console.log("DOWN");
					fillingArray.push(fillingArray = []);
				}
				
			} else if(currentDepth < lastDepth) {
				console.log("SHALLOWER", currentDepth - lastDepth);
				// let arrDepth = nestLevel;
				nestLevel += currentDepth - lastDepth;
				
				let arrDepth = nestLevel;
				
				fillingArray = prev;
				
				while(arrDepth--) {
					console.log("UP");
					fillingArray = fillingArray[fillingArray.length - 1];
				}
				// fillingArray = prev;
			}
			
			// if(nestLevel && i > 0) {
			// 	prev[prev.length - 1].push(<li className="app__menu__item" key={i}><NavLink onlyActiveOnIndex={true} to={path}>{menu_item}</NavLink></li>);
			// } else {
			// 	prev.push(<li className="app__menu__item" key={i}><NavLink onlyActiveOnIndex={true} to={path}>{menu_item}</NavLink></li>);
			// }
			
			fillingArray.push(<li className="app__menu__item" key={fillingArray.length}><NavLink onlyActiveOnIndex={true} to={path}>{menu_item}</NavLink></li>);
			
			lastDepth = currentDepth;
			
			console.log(menu_item, "NEST LEVEL", nestLevel);
			
			return prev;
		}, []).map(function deepMap(li, i) {
			if(Array.isArray(li)) {
				return (
					<li key={i}>
						<ul className="app__menu__list app__menu__list--nested">
							{li.map(deepMap)}
						</ul>
					</li>
				);
			} else return li;
		});
		
		return (
			<nav className={"app__menu " + this.state.menuState}>
				<div className="app__menu__activate activate-btn" onClick={this.openCloseMenu}>
					<span className ="activate-btn__line"/>
					<span className ="activate-btn__line"/>
					<span className ="activate-btn__line"/>
				</div>
				<ul className="app__menu__list">
					<li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/">Home</NavLink></li>
					<li className="app__menu__item"><NavLink to="/intro">Introduction</NavLink></li>
					<li className="app__menu__item"><NavLink to="/worker_types">Worker Types</NavLink></li>
					<li>
						<ul className="app__menu__list app__menu__list--nested">
							<li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/dedicated_worker">Dedicated</NavLink></li>
							<li>
								<ul className="app__menu__list app__menu__list--nested">
									<li className="app__menu__item"><NavLink to="/dedicated_worker/example">Example</NavLink></li>
								</ul>
							</li>
							<li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/shared_worker">Shared</NavLink></li>
							<li>
								<ul className="app__menu__list app__menu__list--nested">
									<li className="app__menu__item"><NavLink to="/shared_worker/example">Example</NavLink></li>
								</ul>
							</li>
						</ul>
					</li>
					<li className="app__menu__item"><NavLink to="/worker_scope">Worker Scope</NavLink></li>
					<li className="app__menu__item"><NavLink to="/inlining_workers">Inlining</NavLink></li>
					<li className="app__menu__item"><NavLink to="/caveats">Caveats</NavLink></li>
					<li className="app__menu__item"><NavLink to="/resources">Resources</NavLink></li>
					<li className="app__menu__item"><NavLink to="/about">About</NavLink></li>
				</ul>
				<ul className="app__menu__list">
					{menuItems}
				</ul>
			</nav>
		);
	}
}

export default Menu;
