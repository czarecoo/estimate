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
		this.state = {
			userStory: "dasd",
			userList: [{ name: "Czareg", isActive: false, isCreator: true }, { name: "Wojteg", isActive: true, isCreator: false }],
			previewStory: null,
			futureStories: [{ tense: -1, issueId: "I-91919", summary: "blellbelleblelbblellbelleblelb", shortSummary: "blellbelleblelb..." }],
			currentStory: [{ tense: 0, issueId: "I-11119", summary: "AsdasdasdasdasdddbAsdasdasdasdasdddb", shortSummary: "Asdasdasdasdasdddb...", users: [{ name: "MICHAU" }, { name: "Robak" }], votes: [3, 5], finalScore: 5 }],
			pastStories: [{ tense: 1, issueId: "I-42319", summary: "HelpHelpHelpHelpHelpHelpHelpHelpHelp", shortSummary: "Help...", users: [{ name: "Czareg" }, { name: "Bozena" }], votes: [0, 5], finalScore: 1 }]
		}
	}
	refresh() {
		window.location.reload()
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	handlePreviewChange(story) {
		if (this.state.previewStory !== story) {
			this.setState({ previewStory: story });
		} else {
			this.setState({ previewStory: null });
		}

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
				<VoteViewStoriesList storyList={this.state.futureStories} onSelectingStory={this.handlePreviewChange.bind(this)} />
				Current Story:<br></br>
				<VoteViewStoriesList storyList={this.state.currentStory} onSelectingStory={this.handlePreviewChange.bind(this)} />
				List of past stories:<br></br>
				<VoteViewStoriesList storyList={this.state.pastStories} onSelectingStory={this.handlePreviewChange.bind(this)} />

				<VoteViewPreview previewStory={this.state.previewStory} />
			</div>
		);
	}
}
export default VoteView
