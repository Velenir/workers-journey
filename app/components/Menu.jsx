import React from 'react';
import NavLink from './NavLink';

import {pages} from '../helpers/routemap';

function constructMenuItems(pages) {
	let lastDepth = 1, nestLevel = 0, fillingArray, visiblyNestedAtLevel;
	return pages.reduce((prev, {path, menu_item, visiblyNested}) => {
		const currentDepth = path.split("/").length - 1;
		
		if(!fillingArray) fillingArray = prev;
		
		if(currentDepth > lastDepth) {
			// console.log("DEEPER", currentDepth - lastDepth);
			
			let arrDepth = currentDepth - lastDepth;
			
			nestLevel += arrDepth;
			while(arrDepth--) {
				// console.log("DOWN");
				fillingArray.push(fillingArray = []);
			}
			
		} else if(currentDepth < lastDepth) {
			// console.log("SHALLOWER", currentDepth - lastDepth);
			nestLevel += currentDepth - lastDepth;
			
			if(nestLevel === visiblyNestedAtLevel && !visiblyNested) {
				// console.log("at visiblyNested level");
				--nestLevel;
			}
			
			let arrDepth = nestLevel;
			
			
			fillingArray = prev;
			
			while(arrDepth--) {
				// console.log("UP");
				fillingArray = fillingArray[fillingArray.length - 1];
			}
			
		} else if(visiblyNested) {
			visiblyNestedAtLevel = ++nestLevel;
			fillingArray.push(fillingArray = []);
		}
		
		fillingArray.push(
			<li className="app__menu__item" key={fillingArray.length}>
				<NavLink onlyActiveOnIndex={path==="/"} to={path}>{menu_item}</NavLink>
			</li>
		);
		
		lastDepth = currentDepth;
		
		// console.log(menu_item, "NEST LEVEL", nestLevel);
		
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
}

const menuItems = constructMenuItems(pages);

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
		
		return (
			<nav className={"app__menu " + this.state.menuState}>
				<div className="app__menu__activate activate-btn" onClick={this.openCloseMenu}>
					<span className ="activate-btn__line"/>
					<span className ="activate-btn__line"/>
					<span className ="activate-btn__line"/>
				</div>
				<ul className="app__menu__list">
					{menuItems}
				</ul>
			</nav>
		);
	}
}

export default Menu;
