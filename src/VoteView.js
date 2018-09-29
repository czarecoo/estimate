import React from 'react';
import './css/VoteView.css';
import VoteViewLoginInfo from './VoteViewLoginInfo'
import VoteViewCurrentStory from './VoteViewCurrentStory'
import VoteViewUsers from './VoteViewUsers'
import SocketManager from './SocketManager';

class VoteView extends React.Component {
	refresh() {
		SocketManager.closeSession();
		window.location.reload()
	}
	render() {
		return (
			<div className="VoteView">
				<VoteViewLoginInfo sessionId={this.props.data.sessionId} myName={this.props.data.login} />
				<button onClick={this.refresh.bind(this)}>Close session</button><br></br>

				<VoteViewCurrentStory userStory={this.props.data.currentStory[0].summary} />
				<VoteViewUsers userList={this.props.data.userList} isSuperUser={this.props.data.isSuperUser} />
			</div>
		);
	}
}
export default VoteView
