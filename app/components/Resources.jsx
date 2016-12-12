import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

import resourcesMark from '../marked/Resources/Resources.md';


const Resources = () => (
	<div className="app__content__main resources">
    <Marked mark={resourcesMark}/>
		<div className="steps-navigation">
			<Link to="caveats" className="arrow" title="Caveats"/>
			<Link to="about" className="arrow" title="About"/>
		</div>
	</div>
);

export default Resources;
