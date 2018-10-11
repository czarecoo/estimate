import React from 'react';
import './css/VoteViewLoginInfo.css';
import SocketManager from './SocketManager';

class VoteViewLoginInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSessionId: false
		}
	}
	render() {
		var closeButton = null;
		if (this.props.data.isSuperUser) {
			if (this.props.data.isJira) {
				closeButton = (<button className="btn btn-md btn-primary vote-btn" onClick={() => SocketManager.closeSession()}>Update finished stories to jira and close session </button>)
			} else {
				closeButton = (<button className="btn btn-md btn-primary vote-btn" onClick={() => SocketManager.closeSession()}>Close session</button>)
			}
		}

		return (
			<div className="VoteViewLoginInfo">
				SessionID: <b>{this.state.showSessionId ? this.props.data.sessionId : <button className="btn btn-md btn-primary vote-btn" onClick={() => this.setState({ showSessionId: true })}>Show sessionID</button>}</b><br></br>
				My name: <b>{this.props.data.login}</b><br></br>
				My userID: <b>{this.props.data.userId}</b><br></br>
				My SocketID: <b>{SocketManager.getSocketId()}</b><br></br>
				{closeButton}
				<button className="btn btn-md btn-primary vote-btn" onClick={() => SocketManager.leaveSession()}>Leave session</button><br></br><br></br>
			</div>
		);
	}
}
export default VoteViewLoginInfo
