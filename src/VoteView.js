import React from 'react';
import './css/VoteView.css';
import VoteViewLoginInfo from './VoteViewLoginInfo'
import VoteViewCurrentStory from './VoteViewCurrentStory'
import VoteViewUsers from './VoteViewUsers'
import VoteViewStoriesList from './VoteViewStoriesList'
import VoteViewPreview from './VoteViewPreview'

class VoteView extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.socket;
		this.previewStory = { summary: "longblebleble", tense: 1, users: [{ name: "Czareg" }], votes: [5], finalScore: 13 };
		this.state = { userStory: "dasd", userList: [{ name: "Czareg", isActive: true, creator: true }, { name: "Wojteg", isActive: false, creator: true }], futureStories: [{ issueId: "I-91919", shortSummary: "blellbelleblelb..." }], currentStory: [{ issueId: "I-11119", shortSummary: "Asdasdasdasdasdddb..." }], pastStories: [{ issueId: "I-42319", shortSummary: "Help..." }, { issueId: "I-14429", shortSummary: "BLEBLEBELBELBELBE..." }] }
	}
	refresh() {
		window.location.reload()
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	sumStories() {
		return (this.state.futureStories.length + this.state.currentStory.length + this.state.pastStories.length);
	}
	render() {
		return (
			<div className="VoteView">
				<VoteViewLoginInfo sessionId={this.props.sessionId} socketId={this.socket.id} myName={this.props.login} />
				<button onClick={this.refresh.bind(this)}>Close session</button><br></br>

				<VoteViewCurrentStory socket={this.socket} userStory={this.state.userStory} />
				<VoteViewUsers socket={this.socket} userList={this.state.userList} isSuperUser={true} />

				<label>How many voted on current story:</label>0 / {this.state.userList.length}<br></br>
				<label>Finished stories:</label>{this.state.pastStories.length} / {this.sumStories()}<br></br>

				List of future stories:<br></br>
				<VoteViewStoriesList storyList={this.state.futureStories} />
				Current Story:<br></br>
				<VoteViewStoriesList storyList={this.state.currentStory} />
				List of past stories:<br></br>
				<VoteViewStoriesList storyList={this.state.pastStories} />

				<VoteViewPreview previewStory={this.previewStory} />
			</div>
		);
	}
}
export default VoteView
