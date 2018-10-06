import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import MainView from './MainView';
import registerServiceWorker from './registerServiceWorker';
import { CookiesProvider } from 'react-cookie';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
	position: 'bottom center',
	timeout: 5000,
	offset: '30px',
	transition: 'scale'
}

ReactDOM.render(
	<AlertProvider template={AlertTemplate} {...options}>
		<CookiesProvider>
			<MainView />
		</CookiesProvider>
	</AlertProvider>
	, document.getElementById('root'));
registerServiceWorker();
