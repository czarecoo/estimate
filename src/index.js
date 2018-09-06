import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import MainView from './MainView';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainView />, document.getElementById('root'));
registerServiceWorker();
