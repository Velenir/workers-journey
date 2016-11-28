import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import typesMark from '../marked/WorkerTypes/WorkerTypes.md';


const WorkerTypes = () => (
	<div className="app__content__main worker-types">
    <Marked mark={typesMark}/>
		<div className="steps-navigation">
			<Link to="/" className="arrow" title="Intro"/>
			<Link to="dedicated_worker" className="arrow" title="Dedicated Worker"/>
		</div>
	</div>
);

export default WorkerTypes;
