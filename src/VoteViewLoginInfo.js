import React from 'react';
import './css/VoteViewLoginInfo.css';
import SocketManager from './SocketManager';

class VoteViewLoginInfo extends React.Component {
	render() {
		return (
			<div className="VoteViewLoginInfo">
				SessionID: <b>{this.props.data.sessionId}</b>{this.props.data.isSuperUser ? <button onClick={() => SocketManager.closeSession()}>Close session</button> : null} <button onClick={() => SocketManager.leaveSession()}>Leave session</button><br></br>
				My name: <b>{this.props.data.login}</b><br></br>
				My name: <b>{this.props.data.userId}</b><br></br>
				My SocketID: <b>{SocketManager.getSocketId()}</b><br></br><br></br>
			</div>
		);
	}
}
export default VoteViewLoginInfo
