import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import sharedMark from '../marked/Shared/Shared.md';


const Shared = () => (
	<div className="app__content__main worker-shared">
    <Marked mark={sharedMark}/>
		<div className="steps-navigation">
			<Link to="dedicated_worker/example" className="arrow" title="Dedicated Worker Example"/>
			<Link to="shared_worker/example" className="arrow" title="Shared Worker Example"/>
		</div>
	</div>
);

export default Shared;
