import React from 'react';
import './css/VoteViewLoginInfo.css';
import SocketManager from './SocketManager';

class VoteViewLoginInfo extends React.Component {
	refresh() {
		SocketManager.closeSession();
	}
	render() {
		return (
			<div className="VoteViewLoginInfo">
				<button onClick={() => window.location.reload()}>Close without emits (for testing only) </button>
				SessionID: <b>{this.props.data.sessionId}</b>{this.props.data.isSuperUser ? <button onClick={this.refresh.bind(this)}>Close session</button> : null}<br></br>
				My name: <b>{this.props.data.login}</b><br></br>
				My name: <b>{this.props.data.userId}</b><br></br>
				My SocketID: <b>{SocketManager.getSocketId()}</b><br></br><br></br>
			</div>
		);
	}
}
export default VoteViewLoginInfo
