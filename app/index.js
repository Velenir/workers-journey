import React from 'react';
import {render} from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Info from './components/Info';

// TODO maybe change browserHistory to hashHitory when deploying

render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="info" component={Info}/>
			<Route path="about" component={About}/>
		</Route>
	</Router>
),
document.getElementById("app"));
