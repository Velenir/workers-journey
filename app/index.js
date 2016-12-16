import React from 'react';
import {render} from 'react-dom';

import { Router, Route, applyRouterMiddleware} from 'react-router';

let history;
if(typeof process !== "undefined" && process.env.NODE_ENV === "production") {
	history = require('react-router/lib/hashHistory');
} else {
	history = require('react-router/lib/browserHistory');
}
// console.log(typeof process !== "undefined" && process.env.NODE_ENV);

import App from './components/App';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

// TODO maybe change browserHistory to hashHitory when deploying

import useScroll from 'react-router-scroll/lib/useScroll';

import routes from './helpers/routemap';

render((
	<Router history={history} render={applyRouterMiddleware(useScroll())}>
		<Route path="/" component={App} children={routes}/>
		<Route path="*" component={NotFound}/>
	</Router>
),
document.getElementById("app"));

render(<Footer history= {history}/>, document.getElementById("footer-mount"));
