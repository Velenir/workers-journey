import React from 'react';
import NavLink from './NavLink';

const Menu = () => (
	<nav className="app__menu">
		<ul className="app__menu__list">
			<li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/">Home</NavLink></li>
			<li className="app__menu__item"><NavLink to="info">Info</NavLink></li>
			<li className="app__menu__item"><NavLink to="about">About</NavLink></li>
		</ul>
	</nav>
);

export default Menu;
