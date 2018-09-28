import React from 'react';
import './css/MainView.css';
import VoteView from './VoteView'
import CreatorView from './CreatorView'
import LoginView from './LoginView'
import SocketManager from './SocketManager';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoggedIn: false };
		SocketManager.setSocket(socket);
	}

	attemptConnection() {
		SocketManager.connect();
		this.setState((prevState) => ({
			isLoggedIn: !prevState.isLoggedIn
		}));
	}

	render() {
		if (this.state.isLoggedIn) {
			return (
				<div className="MainView">
					<VoteView socket={socket} />
					<CreatorView socket={socket} />
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
