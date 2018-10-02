import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import MainView from './MainView';
import registerServiceWorker from './registerServiceWorker';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
	<CookiesProvider>
		<MainView />
	</CookiesProvider>
	, document.getElementById('root'));
registerServiceWorker();
