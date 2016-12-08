import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import inliningMark from '../marked/InliningWorkers/InliningWorkers.md';


const InliningWorkers = () => (
	<div className="app__content__main inlining-workers">
    <Marked mark={inliningMark}/>
		<div className="steps-navigation">
			<Link to="worker_scope" className="arrow" title="Worker Scope"/>
			<Link to="info" className="arrow" title="Info"/>
		</div>
	</div>
);

export default InliningWorkers;
