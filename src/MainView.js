import React from 'react';
import './css/MainView.css';
import VoteView from './VoteView'
import LoginView from './LoginView'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoggedIn: false };
	}

	attemptConnection() {
		this.setState((prevState) => ({
			isLoggedIn: !prevState.isLoggedIn
		}));
	}

	render() {
		if (this.state.isLoggedIn) {
			return (
				<div className="MainView">
					<VoteView socket={socket} />
				</div>
			);
		} else {
			return (
				<div className="MainView">
					<LoginView socket={socket} attemptConnection={this.attemptConnection.bind(this)} />
				</div>
			);
		}
	}
}

export default MainView;
