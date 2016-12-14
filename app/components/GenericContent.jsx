import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';

// import mark from '../marked/Resources/Resources.md';


const GenericContent = ({route: {mainClass, links = [], mark}}) => (
	<div className={`app__content__main ${mainClass}`}>
    <Marked mark={mark}/>
		<div className="steps-navigation">
			{links.map(({path, title}, i) => <Link to={path} className="arrow" title={title} key={i}/>)}
		</div>
	</div>
);

export default GenericContent;
