import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import scopeMark from '../marked/WorkerScope/WorkerScope.md';


const WorkerScope = () => (
	<div className="app__content__main worker-scope">
    <Marked mark={scopeMark}/>
		<div className="steps-navigation">
			<Link to="shared_worker/example" className="arrow" title="Shared Worker Example"/>
			<Link to="info" className="arrow" title="Info"/>
		</div>
	</div>
);

export default WorkerScope;
