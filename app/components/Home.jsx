import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import testMark from '../marked/Home.md';


const Home = () => (
	<div className="home">
    <Marked mark={testMark}/>
	</div>
);

export default Home;
