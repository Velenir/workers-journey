import React from 'react';
import NavLink from './NavLink';

// const Menu = () => (
// 	<nav className="app__menu">
// 		<ul className="app__menu__list">
// 			<li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/">Home</NavLink></li>
// 			<li className="app__menu__item"><NavLink to="info">Info</NavLink></li>
// 			<li className="app__menu__item"><NavLink to="about">About</NavLink></li>
// 		</ul>
// 	</nav>
// );

class Menu extends React.Component {
	constructor() {
		super();
		
		this.state = {
			menuState: "closed"
		};
	}
	
	openCloseMenu = () => {
		this.setState({
			menuState: this.state.menuState === "open" ? "closed" : "open"
		});
	}
	
	render() {
		return (
			<nav className={"app__menu " + this.state.menuState}>
				<div className="app__menu__activate activate-btn" onClick={this.openCloseMenu}>
					<span className ="activate-btn__line"/>
					<span className ="activate-btn__line"/>
					<span className ="activate-btn__line"/>
				</div>
				<ul className="app__menu__list">
					<li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/">Home</NavLink></li>
					<li className="app__menu__item"><NavLink to="/worker_types">Worker Types</NavLink></li>
					<ul className="app__menu__list app__menu__list--nested">
						<li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/dedicated_worker">Dedicated</NavLink></li>
						<ul className="app__menu__list app__menu__list--nested">
							<li className="app__menu__item"><NavLink to="/dedicated_worker/example">Example</NavLink></li>
						</ul>
						<li className="app__menu__item"><NavLink onlyActiveOnIndex={true} to="/shared_worker">Shared</NavLink></li>
						<ul className="app__menu__list app__menu__list--nested">
							<li className="app__menu__item"><NavLink to="/shared_worker/example">Example</NavLink></li>
						</ul>
					</ul>
					<li className="app__menu__item"><NavLink to="/worker_scope">Worker Scope</NavLink></li>
					<li className="app__menu__item"><NavLink to="/inlining_workers">Inlining</NavLink></li>
					<li className="app__menu__item"><NavLink to="/caveats">Caveats</NavLink></li>
					<li className="app__menu__item"><NavLink to="/info">Info</NavLink></li>
					<li className="app__menu__item"><NavLink to="/about">About</NavLink></li>
				</ul>
			</nav>
		);
	}
}

export default Menu;
