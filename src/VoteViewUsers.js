import React from 'react';
import './css/VoteViewUsers.css';
import SocketManager from './SocketManager';

class VoteViewUsers extends React.Component {
	render() {
		const users = this.props.userList.map((user, i) => {
			return (
				<User key={i} name={user.name} isActive={user.isActive} isCreator={user.isCreator} isSuperUser={this.props.isSuperUser} user={user} socket={this.socket} />
			)
		});

		if (this.props.userList.length > 0) {
			return (
				<div className="VoteViewUsers">
					<table className="chat">
						<tbody>
							{users}
						</tbody>
					</table>
				</div>
			);
		}
		else {
			return null;
		}
	}
}

class User extends React.Component {
	kick(user) {
		SocketManager.kick(user);
	}
	passCreator(user) {
		SocketManager.passCreator(user);
	}
	render() {
		var activity = (<img src="user-inactive.png" alt="" />);
		if (this.props.isActive) {
			activity = (<img src="user-active.png" alt="" />);
		}
		var creatorImg = null;
		if (this.props.isCreator) {
			creatorImg = (<td className="creatorImg"><img src="creator.png" alt="" /></td>);
		} else {
			if (this.props.isSuperUser) {
				creatorImg = (<td className="chat"><button onClick={this.passCreator.bind(this, this.props.user)}>Pass creator</button></td>);
			}
		}
		if (this.props.isSuperUser) {
			return (
				<tr className="chat">
					<td className="chat"><b>{this.props.name}</b></td>
					<td>{activity}</td>
					<td className="chat"><button onClick={this.kick.bind(this, this.props.user)}>Kick</button></td>
					{creatorImg}
				</tr>
			);
		} else {
			return (
				<tr className="chat">
					<td className="chat"><b>{this.props.name}</b></td>
					<td>{activity}</td>
					{creatorImg}
				</tr>
			);
		}
	}
}

export default VoteViewUsers
