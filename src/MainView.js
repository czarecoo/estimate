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
		this.state = { isLoggedIn: false, data: null };
		SocketManager.setSocket(socket);
	}
	handleUpdate(dataFromServer) {
		this.setState({
			isLoggedIn: true,
			data: dataFromServer
		});
	}
	componentDidMount() {
		SocketManager.addListeners(this.handleUpdate);
	}
	componentWillUnmount() {
		SocketManager.removeListeners(this.handleUpdate);
	}
	switchViews() {
		this.setState({
			data: {
				login: "czareg",
				userId: 1234,
				sessionId: 134134,
				isSuperUser: true,
				currentStory: [{ tense: 0, issueId: "I-11119", summary: "AsdasdasdasdasdddbAsdasdasdasdasdddb", shortSummary: "Asdasdasdasdasdddb...", users: [{ name: "MICHAU" }, { name: "Robak" }], votes: [3, 5], finalScore: 0 }],
				userList: [{ name: "Czareg", isActive: false, isCreator: true }, { name: "Wojteg", isActive: true, isCreator: false }],
				futureStories: [{ tense: -1, issueId: "I-91919", summary: "blellbelleblelbblellbelleblelb", shortSummary: "blellbelleblelb..." }, { tense: -1, issueId: "I-91919", summary: "blellbelleblelbblellbelleblelb", shortSummary: "blellbelleblelb..." }],
				pastStories: [{ tense: 1, issueId: "I-42319", summary: "HelpHelpHelpHelpHelpHelpHelpHelpHelp", shortSummary: "Help...", users: [{ name: "Czareg" }, { name: "Bozena" }], votes: [0, 5], finalScore: 1 }],
				/*
				data: {
					login: "czareg",
					userId: 1234,
					sessionId: 134134,
					isSuperUser: false,
					currentStory: [{ summary: "AsdasdasdasdasdddbAsdasdasdasdasdddb"}],
					userList: [{ name: "Czareg", isActive: false, isCreator: true }, { name: "Wojteg", isActive: true, isCreator: false }],
				}
				*/
			}
		});
		this.setState((prevState) => ({
			isLoggedIn: !prevState.isLoggedIn
		}));
	}

	render() {
		if (this.state.isLoggedIn) {
			if (this.state.data != null) {
				if (this.state.data.isSuperUser) {
					return (
						<div className="MainView">
							<VoteView data={this.state.data} />
							<CreatorView data={this.state.data} />
						</div>
					);
				} else {
					return (
						<div className="MainView">
							<VoteView data={this.state.data} />
						</div>
					);
				}
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
					<button onClick={this.switchViews.bind(this)}>Skip login (only for testing)</button>
				</div>
			);
		}
	}
}

export default MainView;
