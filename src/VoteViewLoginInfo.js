import React from 'react';
import './css/VoteViewLoginInfo.css';
import SocketManager from './SocketManager';

class VoteViewLoginInfo extends React.Component {
	render() {
		return (
			<div className="VoteViewLoginInfo">
				SessionID: <b>{this.props.data.sessionId}</b><br></br>
				My name: <b>{this.props.data.login}</b><br></br>
				My userID: <b>{this.props.data.userId}</b><br></br>
				My SocketID: <b>{SocketManager.getSocketId()}</b><br></br>
				{this.props.data.isSuperUser ? <button className="btn btn-md btn-primary vote-btn" onClick={() => SocketManager.closeSession()}>Close session</button> : null} <button className="btn btn-md btn-primary vote-btn" onClick={() => SocketManager.leaveSession()}>Leave session</button><br></br><br></br>
			</div>
		);
	}
}
export default VoteViewLoginInfo
