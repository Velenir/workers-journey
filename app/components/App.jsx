import React from 'react';

import Menu from './Menu';

const App = ({children}) => (
	<div className="app">
		<Menu/>
		<div className="app__content">
			{children}
		</div>
		
	</div>
);


export default App;
