import React from 'react';

class SocketManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoggedIn: false };
	}
	static setSocket(s) {
		this.socket = s;
	}
	static connect() {
		this.socket.emit('createSessionRequest');
	}
	static join() {
		this.socket.emit('joinSessionRequest');
	}
}
export default SocketManager;