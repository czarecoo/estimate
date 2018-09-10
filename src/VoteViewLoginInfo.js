import React from 'react';
import './css/VoteViewLoginInfo.css';

class VoteViewLoginInfo extends React.Component {
	render() {
		return (
			<div className="VoteViewLoginInfo">
				SessionID: <b>{this.props.sessionId}</b><br></br>
				My name: <b>{this.props.myName}</b><br></br>
				My SocketID: <b>{this.props.socketId}</b><br></br>
			</div>
		);
	}
}
export default VoteViewLoginInfo
