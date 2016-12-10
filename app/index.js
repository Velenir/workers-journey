import React from 'react';
import {render} from 'react-dom';

import { Router, Route, IndexRoute, applyRouterMiddleware} from 'react-router';

let history;
if(typeof process !== "undefined" && process.env.NODE_ENV === "production") {
	history = require('react-router/lib/hashHistory');
} else {
	history = require('react-router/lib/browserHistory');
}
// console.log(typeof process !== "undefined" && process.env.NODE_ENV);

import App from './components/App';
import Home from './components/Home';
import WorkerTypes from './components/WorkerTypes';
import Dedicated from './components/Dedicated';
import DedicatedExample from './components/DedicatedExample';
import Shared from './components/Shared';
import SharedExample from './components/SharedExample';
import WorkerScope from './components/WorkerScope';
import InliningWorkers from './components/InliningWorkers';
import Caveats from './components/Caveats';
import About from './components/About';
import Info from './components/Info';
import NotFound from './components/NotFound';

// TODO maybe change browserHistory to hashHitory when deploying

import useScroll from 'react-router-scroll/lib/useScroll';

render((
	<Router history={history} render={applyRouterMiddleware(useScroll())}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="worker_types" component={WorkerTypes}/>
			<Route path="dedicated_worker">
				<IndexRoute component={Dedicated}/>
				<Route path="example" component={DedicatedExample}/>
			</Route>
			<Route path="shared_worker">
				<IndexRoute component={Shared}/>
				<Route path="example" component={SharedExample}/>
			</Route>
			<Route path="worker_scope" component={WorkerScope}/>
			<Route path="inlining_workers" component={InliningWorkers}/>
			<Route path="caveats" component={Caveats}/>
			<Route path="info" component={Info}/>
			<Route path="about" component={About}/>
			<Route path="*" component={NotFound}/>
		</Route>
	</Router>
),
document.getElementById("app"));
