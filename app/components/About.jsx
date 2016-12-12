import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import aboutMark from '../marked/About/About.md';


const About = () => (
	<div className="app__content__main about">
    <Marked mark={aboutMark}/>
		<div className="steps-navigation">
			<Link to="resources" className="arrow" title="Resources"/>
		</div>
	</div>
);

export default About;
