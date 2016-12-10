import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import introMark from '../marked/Intro/Intro.md';


const Intro = () => (
	<div className="app__content__main intro">
    <Marked mark={introMark}/>
		<div className="steps-navigation">
			<Link to="/" className="arrow" title="Home"/>
			<Link to="worker_types" className="arrow" title ="Worker Types"/>
		</div>
	</div>
);

export default Intro;
