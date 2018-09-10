import React from 'react';
import './css/VoteViewVoteTable.css';

class VoteViewVoteTable extends React.Component {
	constructor(props) {
		super(props);
		this.story = this.props.story;
	}
	render() {
		if (this.story === undefined || this.story.users === undefined || this.story.votes === undefined) {
			return null;
		}
		const users = this.story.users.map((user, i) => {
			return (
				<td key={i}>{user.name}</td>
			)
		});
		const votes = this.story.votes.map((vote, i) => {
			return (
				<td key={i}>{vote === 0 ? '?' : vote}</td>
			)
		});
		return (
			<div className="VoteViewVoteTable">
				<table>
					<tbody>
						<tr>
							{users}
						</tr>
						<tr>
							{votes}
						</tr>
					</tbody>
				</table>
				<br></br>
				Final score: {this.story.finalScore}
			</div>
		);
	}
}
export default VoteViewVoteTable
