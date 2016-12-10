import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import homeMark from '../marked/Home/Home.md';


const Home = () => (
	<div className="app__content__main home">
    <Marked mark={homeMark}/>
		<div className="steps-navigation">
			<Link to="intro" className="arrow" title ="Introduction"/>
		</div>
	</div>
);

export default Home;
