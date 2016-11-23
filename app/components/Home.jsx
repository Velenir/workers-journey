import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import testMark from '../marked/Home.md';


const Home = () => (
	<div className="home">
		<h2 className="home__title">Welcome</h2>
		<p className="home__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <Marked mark={testMark}/>
	</div>
);

export default Home;
