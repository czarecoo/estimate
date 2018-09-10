import React from 'react';
import './css/VoteViewUsers.css';

class VoteViewUsers extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.socket;
	}
	render() {
		const users = this.props.userList.map((user, i) => {
			return (
				<User key={i} name={user.name} isActive={user.isActive} creator={user.isCreator} isSuperUser={this.props.isSuperUser} socket={this.socket} />
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
	constructor(props) {
		super(props);
		this.kick = this.kick.bind(this);
	}
	kick() {
		this.props.socket.emit("user:kick", this.socketid, "kicking", this.props.sessionid);
	}
	render() {
		var activity = (<img src="user-inactive.png" id="user-inactive" alt="" />);
		if (this.props.isActive) {
			activity = (<img src="user-active.png" id="user-active" alt="" />);
		}
		var creatorImg = (<td></td>);
		if (this.props.isCreator) {
			creatorImg = (<td className="chat"><img src="creator.png" id="creatorp" alt="" /></td>);
		}
		if (this.props.isSuperUser) {
			return (
				<tr className="chat">
					<td className="chat"><b>{this.props.name}</b></td>
					<td>{activity}</td>
					{creatorImg}
				</tr>
			);
		} else {
			return (
				<tr className="chat">
					<td className="chat"><b>{this.props.name}</b></td>
					<td>{activity}</td>
					<td className="chat"><button onClick={this.kick} className="btn btn-md btn-primary btnnormal">Kick</button></td>
					{creatorImg}
				</tr>
			);
		}
	}
}

export default VoteViewUsers
