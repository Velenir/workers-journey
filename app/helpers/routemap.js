import React from 'react';
import { Route, IndexRoute } from 'react-router';
import GenericContent from '../components/GenericContent';


// md is relative to '../marked'
const pages = [
	{path: "/", menu_item: "Home", mainClass: "home", md: "./Home/Home.md"},
	{path: "/intro", menu_item: "Introduction", mainClass: "intro", md: "./Intro/Intro.md"},
	{path: "/worker_types", menu_item: "Worker Types", mainClass: "worker-types", md: "./WorkerTypes/WorkerTypes.md"},
	{path: "/dedicated_worker", menu_item: "Dedicated", link_title: "Dedicated Worker", mainClass: "worker-dedicated", md: "./Dedicated/Dedicated.md"},
	{path: "/dedicated_worker/example", menu_item: "Example", link_title: "Dedicated Worker Example", mainClass: "worker-dedicated__example", md: "./Dedicated/DedicatedExample.md"},
	{path: "/shared_worker", menu_item: "Shared", link_title: "Shared Worker", mainClass: "worker-shared", md: "./Shared/Shared.md"},
	{path: "/shared_worker/example", menu_item: "Example", link_title: "Shared Worker Example", mainClass: "worker-shared__example", md: "./Shared/SharedExample.md"},
	{path: "/worker_scope", menu_item: "Scope", link_title: "Worker Scope", mainClass: "worker-scope", md: "./WorkerScope/WorkerScope.md"},
	{path: "/inlining_workers", menu_item: "Inlining", link_title: "Inlining Workers", mainClass: "inlining-workers", md: "./InliningWorkers/InliningWorkers.md"},
	{path: "/caveats", menu_item: "Caveats", mainClass: "caveats", md: "./Caveats/Caveats.md"},
	{path: "/resources", menu_item: "Resources", mainClass: "resources", md: "./Resources/Resources.md"},
	{path: "/about", menu_item: "About", mainClass: "about", md: "./About/About.md"}
];

const req = require.context("../marked", true, /.md$/);

function getMark(menu_item) {
	menu_item = menu_item.replace(" ", "");
	menu_item = `./${menu_item}/${menu_item}.md`;
	return req(menu_item);
}


const generics = pages.map(({path, menu_item, mainClass, component = GenericContent, md}, i, a) => {
	const links = [];

	if(i > 0) {
		const {path, menu_item, link_title: title = menu_item} = a[i-1];
		links.push({path, title});
		
		if(i === a.length - 1) mainClass += " app__content__main--last";
	}
	if(i < a.length - 1) {
		const {path, menu_item, link_title: title = menu_item} = a[i+1];
		links.push({path, title});
		
		if(i === 0) mainClass += " app__content__main--first";
	}

	const RouteComponent = path === "/" ? (path = undefined, IndexRoute) : Route;
	
	return <RouteComponent path={path} component={component} mainClass={mainClass} links={links} mark={req(md)} key={i}/>;
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
