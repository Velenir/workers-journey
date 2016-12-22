import React from 'react';
import {render} from 'react-dom';

import { Router, Route, applyRouterMiddleware, browserHistory} from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

import useScroll from 'react-router-scroll/lib/useScroll';

import routes from './helpers/routemap';

let logPageView;

/* eslint-disable no-undef */
if(typeof PRODUCTION !== "undefined" && PRODUCTION) {
	const ReactGA = require('react-ga');
	ReactGA.initialize(GA_ID);
/* eslint-enable no-undef */
	
	logPageView = function() {
		ReactGA.set({ page: window.location.pathname });
		ReactGA.pageview(window.location.pathname);
	};
}

render((
	<Router history={browserHistory} render={applyRouterMiddleware(useScroll())} onUpdate={logPageView}>
		<Route path="/" component={App}>
			{routes}
		<Route path="*" component={NotFound}/>
	</Route>
	</Router>
),
document.getElementById("app"));

render(<Footer history={browserHistory}/>, document.getElementById("footer-mount"));
