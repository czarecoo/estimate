import React from 'react';
import './css/CreatorViewFinalVote.css';
import SocketManager from './SocketManager';

class CreatorViewFinalVote extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.socket;
		this.state = {
			finalScore: 0
		}
	}
	setFinalScore(event) {
		this.setState({ finalScore: event.target.value });
	}
	render() {
		return (
			<div className="FinalVote">
				Choose final score:<br></br>
				<table className="buttons">
					<tbody>
						<tr>
							<th><button className="" ref='a1' onClick={this.setFinalScore.bind(this)} value={1}>1</button></th>
							<th><button className="" ref='a2' onClick={this.setFinalScore.bind(this)} value={2}>2</button></th>
							<th><button className="" ref='a3' onClick={this.setFinalScore.bind(this)} value={3}>3</button></th>
							<th><button className="" ref='a5' onClick={this.setFinalScore.bind(this)} value={5}>5</button></th>
							<th><button className="" ref='a8' onClick={this.setFinalScore.bind(this)} value={8}>8</button></th>
							<th><button className="" ref='a13' onClick={this.setFinalScore.bind(this)} value={13}>13</button></th>
							<th><button className="" ref='a21' onClick={this.setFinalScore.bind(this)} value={21}>21</button></th>
						</tr>
					</tbody>
				</table>
				Final score: {this.state.finalScore}<br></br>
				<button onClick={() => this.props.onFinishStory()}>Finish story</button><br></br>
				<button>Revote</button><br></br>

			</div>
		);
	}
}
export default CreatorViewFinalVote
