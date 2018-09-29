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
			data: dataFromServer
		});
	}
	componentDidMount() {
		SocketManager.addServerListener(this.handleUpdate);
	}
	componentWillUnmount() {
		SocketManager.removeServerListener(this.handleUpdate);
	}
	switchViews() {
		this.setState({
			data: {
				login: "czareg",
				sessionId: 134134,
				isSuperUser: true,
				futureStories: [{ tense: -1, issueId: "I-91919", summary: "blellbelleblelbblellbelleblelb", shortSummary: "blellbelleblelb..." }],
				currentStory: [{ tense: 0, issueId: "I-11119", summary: "AsdasdasdasdasdddbAsdasdasdasdasdddb", shortSummary: "Asdasdasdasdasdddb...", users: [{ name: "MICHAU" }, { name: "Robak" }], votes: [3, 5], finalScore: 0 }],
				pastStories: [{ tense: 1, issueId: "I-42319", summary: "HelpHelpHelpHelpHelpHelpHelpHelpHelp", shortSummary: "Help...", users: [{ name: "Czareg" }, { name: "Bozena" }], votes: [0, 5], finalScore: 1 }],
				userList: [{ name: "Czareg", isActive: false, isCreator: true }, { name: "Wojteg", isActive: true, isCreator: false }],
			}
			//data: null
		});
		this.setState((prevState) => ({
			isLoggedIn: !prevState.isLoggedIn
		}));
	}

	render() {
		if (this.state.isLoggedIn) {
			return (
				<div className="MainView">
					<VoteView data={this.state.data} />
					<CreatorView data={this.state.data} />
				</div>
			);
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
