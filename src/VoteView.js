import React from 'react';
import './css/VoteView.css';
import VoteViewLoginInfo from './VoteViewLoginInfo'
import VoteViewCurrentStory from './VoteViewCurrentStory'
import VoteViewUsers from './VoteViewUsers'

class VoteView extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.socket;
		this.state = {
			userStory: "dasd",
			userList: [{ name: "Czareg", isActive: false, isCreator: true }, { name: "Wojteg", isActive: true, isCreator: false }],
		}
	}
	refresh() {
		window.location.reload()
	}
	render() {
		return (
			<div className="VoteView">
				<VoteViewLoginInfo sessionId={this.props.sessionId} socketId={this.socket.id} myName={this.props.login} />
				<button onClick={this.refresh.bind(this)}>Close session</button><br></br>

				<VoteViewCurrentStory socket={this.socket} userStory={this.state.userStory} />
				<VoteViewUsers socket={this.socket} userList={this.state.userList} isSuperUser={true} />
			</div>
		);
	}
}
export default VoteView
