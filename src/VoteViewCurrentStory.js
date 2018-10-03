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
		return (
			<div className="CurrentStory col-xs-12 col-md-8 col-lg-8 col-xl-8">
				Current Story:<br></br>
				<textarea className="storyWidth" name="userStory" type="text" placeholder="There is no voting going on right now..." value={this.props.userStory} style={{ resize: "none", }} readOnly={true} />
				<table className="buttons storyWidth">
					<tbody>
						<tr>
							<th><button className="vote-btn btn btn-md btn-primary btn-width" ref='a1' onClick={this.vote.bind(this)} value={1}>1</button></th>
							<th><button className="vote-btn btn btn-md btn-primary btn-width" ref='a2' onClick={this.vote.bind(this)} value={2}>2</button></th>
							<th><button className="vote-btn btn btn-md btn-primary btn-width" ref='a3' onClick={this.vote.bind(this)} value={3}>3</button></th>
							<th><button className="vote-btn btn btn-md btn-primary btn-width" ref='a5' onClick={this.vote.bind(this)} value={5}>5</button></th>
							<th><button className="vote-btn btn btn-md btn-primary btn-width" ref='a8' onClick={this.vote.bind(this)} value={8}>8</button></th>
							<th><button className="vote-btn btn btn-md btn-primary btn-width" ref='a13' onClick={this.vote.bind(this)} value={13}>13</button></th>
							<th><button className="vote-btn btn btn-md btn-primary btn-width" ref='a21' onClick={this.vote.bind(this)} value={21}>21</button></th>
							<th><button className="vote-btn btn btn-md btn-primary btn-width" ref='a0' onClick={this.vote.bind(this)} value={0}>?</button></th>
							<th><button className="vote-btn btn btn-md btn-primary btn-width" onClick={this.coffee.bind(this)} ><img className="coffee" src="cafe.png" alt="coffee"/></button></th>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default VoteViewCurrentStory
