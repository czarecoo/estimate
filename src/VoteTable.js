import React from 'react';
import './css/VoteTable.css';

class VoteTable extends React.Component {
	render() {
		if (this.props.story === null || this.props.story === undefined || this.props.story.users === undefined || this.props.story.votes === undefined) {
			return null;
		}
		const users = this.props.story.users.map((user, i) => {
			return (
				<td key={i}>{user.name}</td>
			)
		});
		const votes = this.props.story.votes.map((vote, i) => {
			return (
				<td key={i}>{vote === '0' ? '?' : vote}</td>
			)
		});
		var finalScore = null;
		if (this.props.story.finalScore !== undefined && this.props.story.finalScore !== null && this.props.story.finalScore !== 0) {
			finalScore = (<div>Final score: {this.props.story.finalScore}</div>);
		}
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
				{finalScore}
			</div>
		);
	}
}
export default VoteTable
