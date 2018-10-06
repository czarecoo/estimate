import React from 'react';
import './css/MainView.css';
import VoteView from './VoteView'
import CreatorView from './CreatorView'
import LoginView from './LoginView'
import SocketManager from './SocketManager';
import openSocket from 'socket.io-client';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

const socket = openSocket('http://localhost:8080');

class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false, data: null, cookies: this.props.cookies,
			scores: [1, 2, 3, 5, 8, 13, 21],
			scoresWithZero: [1, 2, 3, 5, 8, 13, 21, 0]
		};
		SocketManager.setSocket(socket);
	}
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	handleUpdate(dataFromServer) {
		if (this.state.isLoggedIn === false) {
			this.switchToVoteView(dataFromServer);
		}
		this.setState({
			data: dataFromServer
		});
	}
	componentDidMount() {
		SocketManager.addListeners(this.handleUpdate.bind(this), this.state.cookies);
		SocketManager.rejoinSession(this.state.cookies.get("login"), this.state.cookies.get("userId"), this.state.cookies.get("sessionId"));
	}
	componentWillUnmount() {
		SocketManager.removeListeners(this.handleUpdate.bind(this), this.state.cookies);
	}
	switchToVoteView(dataFromServer) {
		this.state.cookies.set("login", dataFromServer.login, { maxAge: 3600 * 24, path: '/' });
		this.state.cookies.set("userId", dataFromServer.userId, { maxAge: 3600 * 24, path: '/' });
		this.state.cookies.set("sessionId", dataFromServer.sessionId, { maxAge: 3600 * 24, path: '/' });
		this.setState({
			isLoggedIn: true,
		});
	}

	render() {
		if (this.state.isLoggedIn) {
			if (this.state.data != null) {
				return (
					<div className="MainView">
						<div className="MainViewContent">
							<VoteView data={this.state.data} scores={this.state.scoresWithZero} />
							{this.state.data.isSuperUser ? <CreatorView data={this.state.data} scores={this.state.scores} /> : null}
						</div>
					</div>
				);
			} else {
				return (
					<div className="MainView">
						Something went wrong...
					</div>
				);
			}
		} else {
			return (
				<div className="MainView">
					<LoginView />
				</div>
			);
		}
	}
}
export default withCookies(MainView);
