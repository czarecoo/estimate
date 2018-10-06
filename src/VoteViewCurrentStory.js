import React from 'react';
import './css/VoteViewCurrentStory.css';
import SocketManager from './SocketManager';

class VoteViewCurrentStory extends React.Component {
	vote(event) {
		SocketManager.vote(event.target.value);
	}
	coffee() {
		SocketManager.coffee();
	}
	render() {
		var buttons = this.props.scores.map((score, i) => {
			return (
				<th key={i}><button className="vote-btn btn btn-md btn-primary btn-width" style={{ background: this.props.currentVote !== null && parseInt(this.props.currentVote, 10) === score ? 'green' : "" }} onClick={this.vote.bind(this)} value={score}>{score === 0 ? "?" : score}</button></th>
			)
		});
		return (
			<div className="CurrentStory col-xs-12 col-md-8 col-lg-8 col-xl-8">
				Current Story:<br></br>
				<textarea className="storyWidth" name="userStory" type="text" placeholder="There is no voting going on right now..." value={this.props.userStory} style={{ resize: "none", }} readOnly={true} />
				<table className="buttons storyWidth">
					<tbody>
						<tr>
							{buttons}
							<th><button className="vote-btn btn btn-md btn-primary btn-width" onClick={this.coffee.bind(this)} ><img className="coffee" src="cafe.png" alt="coffee" /></button></th>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default VoteViewCurrentStory
