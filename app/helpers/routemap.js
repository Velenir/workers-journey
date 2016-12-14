import React from 'react';
import { Route, IndexRoute } from 'react-router';
import GenericContent from '../components/GenericContent';

import Caveats from '../components/Caveats';
import GenericWorkerExample from '../components/GenericWorkerExample';

const req = require.context("../marked", true, /.md$/);
// mark is relative to '../marked'
const pages = [
	{path: "/", menu_item: "Home", mainClass: "home", mark: "./Home/Home.md"},
	{path: "/intro", menu_item: "Introduction", mainClass: "intro", mark: "./Intro/Intro.md"},
	{path: "/worker_types", menu_item: "Worker Types", mainClass: "worker-types", mark: "./WorkerTypes/WorkerTypes.md"},
	{path: "/worker_types/dedicated_worker", menu_item: "Dedicated", link_title: "Dedicated Worker", mainClass: "worker-dedicated", mark: "./Dedicated/Dedicated.md", visNested: false},
	{path: "/worker_types/dedicated_worker/example", menu_item: "Example", link_title: "Dedicated Worker Example", mainClass: "worker-dedicated__example", mark: "./Dedicated/DedicatedExample.md", component: GenericWorkerExample},
	{path: "/worker_types/shared_worker", menu_item: "Shared", link_title: "Shared Worker", mainClass: "worker-shared", mark: "./Shared/Shared.md", visNested: false},
	{path: "/worker_types/shared_worker/example", menu_item: "Example", link_title: "Shared Worker Example", mainClass: "worker-shared__example", mark: "./Shared/SharedExample.md", component: GenericWorkerExample},
	{path: "/worker_scope", menu_item: "Scope", link_title: "Worker Scope", mainClass: "worker-scope", mark: "./WorkerScope/WorkerScope.md"},
	{path: "/inlining_workers", menu_item: "Inlining", link_title: "Inlining Workers", mainClass: "inlining-workers", mark: "./InliningWorkers/InliningWorkers.md"},
	{path: "/caveats", menu_item: "Caveats", mainClass: "caveats", mark: "./Caveats/Caveats.md", component: Caveats},
	{path: "/resources", menu_item: "Resources", mainClass: "resources", mark: "./Resources/Resources.md"},
	{path: "/about", menu_item: "About", mainClass: "about", mark: "./About/About.md"}
];




const generics = pages.map((page, i, a) => {
	const props = Object.assign({component: GenericContent, links: []}, page, {mark: req(page.mark)});

	if(i > 0) {
		const {path, menu_item, link_title: title = menu_item} = a[i-1];
		props.links.push({path, title});
		
		if(i === a.length - 1) props.mainClass += " app__content__main--last";
	}
	if(i < a.length - 1) {
		const {path, menu_item, link_title: title = menu_item} = a[i+1];
		props.links.push({path, title});
		
		if(i === 0) props.mainClass += " app__content__main--first";
	}

	const RouteComponent = props.path === "/" ? (props.path = undefined, IndexRoute) : Route;
	
	return <RouteComponent {...props} key={i}/>;
});


export {pages, generics as default};

// onlyActiveOnIndex={true} to="/">Home
// to="/intro">Introduction
// to="/worker_types">Worker Types
// onlyActiveOnIndex={true} to="/dedicated_worker">Dedicated
// to="/dedicated_worker/example">Example
// onlyActiveOnIndex={true} to="/shared_worker">Shared
// to="/shared_worker/example">Example
// to="/worker_scope">Worker Scope
// to="/inlining_workers">Inlining
// to="/caveats">Caveats
// to="/resources">Resources
// to="/about">About

// <li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/">Home</NavLink></li>
// <li className="app__menu__item"><NavLink to="/intro">Introduction</NavLink></li>
// <li className="app__menu__item"><NavLink to="/worker_types">Worker Types</NavLink></li>
// <ul className="app__menu__list app__menu__list--nested">
// 	<li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/dedicated_worker">Dedicated</NavLink></li>
// 	<ul className="app__menu__list app__menu__list--nested">
// 		<li className="app__menu__item"><NavLink to="/dedicated_worker/example">Example</NavLink></li>
// 	</ul>
// 	<li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/shared_worker">Shared</NavLink></li>
// 	<ul className="app__menu__list app__menu__list--nested">
// 		<li className="app__menu__item"><NavLink to="/shared_worker/example">Example</NavLink></li>
// 	</ul>
// </ul>
// <li className="app__menu__item"><NavLink to="/worker_scope">Worker Scope</NavLink></li>
// <li className="app__menu__item"><NavLink to="/inlining_workers">Inlining</NavLink></li>
// <li className="app__menu__item"><NavLink to="/caveats">Caveats</NavLink></li>
// <li className="app__menu__item"><NavLink to="/resources">Resources</NavLink></li>
// <li className="app__menu__item"><NavLink to="/about">About</NavLink></li>
