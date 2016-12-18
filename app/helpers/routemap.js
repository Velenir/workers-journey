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
	{path: "/dedicated_worker", menu_item: "Dedicated", link_title: "Dedicated Worker", mainClass: "worker-dedicated", mark: "./Dedicated/Dedicated.md", visiblyNested: true},
	{path: "/dedicated_worker/example", menu_item: "Example", link_title: "Dedicated Worker Example", mainClass: "worker-dedicated__example", mark: "./Dedicated/DedicatedExample.md", component: GenericWorkerExample},
	{path: "/shared_worker", menu_item: "Shared", link_title: "Shared Worker", mainClass: "worker-shared", mark: "./Shared/Shared.md", visiblyNested: true},
	{path: "/shared_worker/example", menu_item: "Example", link_title: "Shared Worker Example", mainClass: "worker-shared__example", mark: "./Shared/SharedExample.md", component: GenericWorkerExample},
	{path: "/worker_scope", menu_item: "Scope", link_title: "Worker Scope", mainClass: "worker-scope", mark: "./WorkerScope/WorkerScope.md"},
	{path: "/inlining_workers", menu_item: "Inlining", link_title: "Inlining Workers", mainClass: "inlining-workers", mark: "./InliningWorkers/InliningWorkers.md"},
	{path: "/caveats", menu_item: "Caveats", mainClass: "caveats", mark: "./Caveats/Caveats.md", component: Caveats},
	{path: "/resources", menu_item: "Resources", mainClass: "resources", mark: "./Resources/Resources.md"},
	{path: "/about", menu_item: "About", mainClass: "about", mark: "./About/About.md"}
];




const generics = pages.map((page, i, a) => {
	const props = Object.assign({component: GenericContent, links: []}, page, {mark: req(page.mark), pageNumber: i + 1});

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

const pagesTotal = pages.length;


export {pages, pagesTotal, generics as default};
