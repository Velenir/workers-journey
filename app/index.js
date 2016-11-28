import React from 'react';
import {render} from 'react-dom';

import { Router, Route, IndexRoute} from 'react-router';

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
import About from './components/About';
import Info from './components/Info';

// TODO maybe change browserHistory to hashHitory when deploying

render((
	<Router history={history}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="worker_types" component={WorkerTypes}/>
			<Route path="dedicated_worker">
				<IndexRoute component={Dedicated}/>
				<Route path="example" component={DedicatedExample}/>
			</Route>
			<Route path="info" component={Info}/>
			<Route path="about" component={About}/>
		</Route>
	</Router>
),
document.getElementById("app"));
