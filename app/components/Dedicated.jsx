import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import dedicatedMark from '../marked/Dedicated/Dedicated.md';


const Dedicated = () => (
	<div className="app__content__main worker-dedicated">
    <Marked mark={dedicatedMark}/>
		<div className="steps-navigation">
			<Link to="worker_types" className="arrow" title="Worker Types"/>
			<Link to="dedicated_worker/example" className="arrow" title="Dedeicated Worker Example"/>
		</div>
	</div>
);

export default Dedicated;
