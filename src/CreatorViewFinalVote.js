import React from 'react';
import './css/CreatorViewFinalVote.css';
import SocketManager from './SocketManager';

class CreatorViewFinalVote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			finalScore: 0
		}
	}
	setFinalScore(event) {
		this.setState({ finalScore: event.target.value });
	}
	finishStory(story) {
		SocketManager.finishStory(story, this.state.finalScore);
		this.props.onFinishStory();
	}
	revote(story) {
		SocketManager.revote(story);
		this.props.onFinishStory();
	}
	render() {
		var buttons = this.props.scores.filter((score) => {
			if (score >= Math.min.apply(Math, this.props.userStory.votes) && score <= Math.max.apply(Math, this.props.userStory.votes)) {
				return true;
			}
			return false;
		}).map((score, i) => {
			return (
				<th key={i}><button className="" ref={'a' + (i + 1)} onClick={this.setFinalScore.bind(this)} value={score}>{score}</button></th>
			)
		});
		console.log(buttons);
		return (
			<div className="FinalVote">
				Choose final score:<br></br>
				<table className="buttons">
					<tbody>
						<tr>
							{buttons}
						</tr>
					</tbody>
				</table>
				Final score: {this.state.finalScore}<br></br>
				<button onClick={this.finishStory.bind(this, this.props.userStory)}>Finish story</button><br></br>
				<button onClick={this.revote.bind(this, this.props.userStory)}>Revote</button><br></br>

			</div>
		);
	}
}
export default CreatorViewFinalVote
