import React from 'react';
import {Link} from 'react-router';
import Marked from './Marked';


const GenericContent = ({children, ...rest}) => {
	const {mainClass, links = [], mark} = rest.route || rest;
	return (
		<div className={`app__content__main ${mainClass}`}>
			<Marked mark={mark}/>
			{children}
			<div className="steps-navigation">
				{links.map(({path, title}, i) => <Link to={path} className="arrow" title={title} key={i}/>)}
			</div>
		</div>
	);
};

export default GenericContent;
