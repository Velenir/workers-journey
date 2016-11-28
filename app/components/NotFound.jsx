import React from 'react';
import {Link} from 'react-router';


// TODO: add Go back link with history.back()
const NotFound = () => (
	<div className="app__content__main not-found">
		<h1 className="not-found__disclaimer">Nothing to see here</h1>
		Go <Link to="/">home</Link>
	</div>
);

export default NotFound;
