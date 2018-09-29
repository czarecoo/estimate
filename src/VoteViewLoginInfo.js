import React from 'react';
import './css/VoteViewLoginInfo.css';
import SocketManager from './SocketManager';

class VoteViewLoginInfo extends React.Component {
	render() {
		return (
			<div className="VoteViewLoginInfo">
				SessionID: <b>{this.props.sessionId}</b><br></br>
				My name: <b>{this.props.myName}</b><br></br>
				My SocketID: <b>{SocketManager.getSocketId()}</b><br></br>
			</div>
		);
	}
}
export default VoteViewLoginInfo
