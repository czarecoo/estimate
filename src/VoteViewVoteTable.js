import React from 'react';
import './css/VoteViewVoteTable.css';

class VoteViewVoteTable extends React.Component {
	render() {
		if (this.props.story === undefined || this.props.story.users === undefined || this.props.story.votes === undefined) {
			return null;
		}
		const users = this.props.story.users.map((user, i) => {
			return (
				<td key={i}>{user.name}</td>
			)
		});
		const votes = this.props.story.votes.map((vote, i) => {
			return (
				<td key={i}>{vote === 0 ? '?' : vote}</td>
			)
		});
		return (
			<div>
				<table className="VoteTable">
					<tbody>
						<tr>
							<td>User: </td>
							{users}
						</tr>
						<tr>
							<td>Vote: </td>
							{votes}
						</tr>
					</tbody>
				</table>
				<br></br>
				Final score: {this.props.story.finalScore}
			</div>
		);
	}
}
export default VoteViewVoteTable
