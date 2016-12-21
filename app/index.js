import React from 'react';
import {render} from 'react-dom';

import { Router, Route, applyRouterMiddleware, browserHistory} from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

import useScroll from 'react-router-scroll/lib/useScroll';

import routes from './helpers/routemap';

render((
	<Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
		<Route path="/" component={App}>
			{routes}
		<Route path="*" component={NotFound}/>
	</Route>
	</Router>
),
document.getElementById("app"));

render(<Footer history={browserHistory}/>, document.getElementById("footer-mount"));
