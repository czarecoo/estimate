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
		if (this.state.finalScore !== 0) {
			SocketManager.finishStory(story, this.state.finalScore);
			this.props.onFinishStory();
		}
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
				<th key={i}><button className="vote-btn btn btn-md btn-primary" style={{ background: parseInt(this.state.finalScore, 10) === score ? 'green' : "" }} onClick={this.setFinalScore.bind(this)} value={score}>{score}</button></th>
			)
		});
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
				<button className="btn btn-md btn-primary vote-btn" onClick={this.finishStory.bind(this, this.props.userStory)}><img className="image" src="finish.png" alt="submit" /><br></br>Finish story</button>
				<button className="btn btn-md btn-primary vote-btn" onClick={this.revote.bind(this, this.props.userStory)}><img className="image" src="FinalRevote.png" alt="submit" /><br></br>Revote</button>

			</div>
		);
	}
}
export default CreatorViewFinalVote
