import React from 'react';
import {Link} from 'react-router';

const NotFound = () => (
	<div className="app__content__main not-found">
		<h1 className="not-found__disclaimer">Nothing to see here</h1>
		<p>
			Go <a href="" onClick={(e) => (e.preventDefault(), history.back())}>back</a>
			Go <Link to="/">home</Link>
		</p>
	</div>
);

export default NotFound;
