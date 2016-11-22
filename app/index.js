import React from 'react';
import {render} from 'react-dom';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Info from './components/Info';

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="info" component={Info}/>
			<Route path="about" component={About}/>
		</Route>
	</Router>
),
document.getElementById("app"));
