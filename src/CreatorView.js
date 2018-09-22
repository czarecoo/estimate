import React from 'react';
import './css/CreatorView.css';
import CreatorViewStoriesList from './CreatorViewStoriesList'
import CreatorViewPreview from './CreatorViewPreview'
import VoteTable from './VoteTable'
import CreatorViewFinalVote from './CreatorViewFinalVote'


class CreatorView extends React.Component {
	constructor(props) {
		super(props);
		this.socket = this.props.socket;
		this.state = {
			isFinishingStory: false,
			userList: [{ name: "Czareg", isActive: false, isCreator: true }, { name: "Wojteg", isActive: true, isCreator: false }],
			previewStory: null,
			futureStories: [{ tense: -1, issueId: "I-91919", summary: "blellbelleblelbblellbelleblelb", shortSummary: "blellbelleblelb..." }],
			currentStory: [{ tense: 0, issueId: "I-11119", summary: "AsdasdasdasdasdddbAsdasdasdasdasdddb", shortSummary: "Asdasdasdasdasdddb...", users: [{ name: "MICHAU" }, { name: "Robak" }], votes: [3, 5], finalScore: 0 }],
			pastStories: [{ tense: 1, issueId: "I-42319", summary: "HelpHelpHelpHelpHelpHelpHelpHelpHelp", shortSummary: "Help...", users: [{ name: "Czareg" }, { name: "Bozena" }], votes: [0, 5], finalScore: 1 }]
		}
	}
	handlePreviewChange(story) {
		if (this.state.previewStory !== story) {
			this.setState({ previewStory: story });
		} else {
			this.setState({ previewStory: null });
		}
	}
	handleFinishStory() {
		this.setState((prevState) => ({
			isFinishingStory: !prevState.isFinishingStory
		}));
	}
	sumStories() {
		return (this.state.futureStories.length + this.state.currentStory.length + this.state.pastStories.length);
	}
	render() {
		if (this.state.isFinishingStory) {
			return (
				<div className="CreatorFinishStoryView">
					<button onClick={this.handleFinishStory.bind(this)}>Abort finish story</button>

					Current Vote:
					<VoteTable story={this.state.previewStory} />
					<CreatorViewFinalVote socket={this.socket} userStory={this.state.previewStory} onFinishStory={this.handleFinishStory.bind(this)} />
				</div>
			);
		} else {
			return (
				<div className="CreatorView">
					<label>How many voted on current story:</label>0 / {this.state.userList.length}<br></br>
					<label>Finished stories:</label>{this.state.pastStories.length} / {this.sumStories()}<br></br>
					List of future stories:<br></br>
					<CreatorViewStoriesList storyList={this.state.futureStories} onSelectingStory={this.handlePreviewChange.bind(this)} />
					Current Story:<br></br>
					<CreatorViewStoriesList storyList={this.state.currentStory} onSelectingStory={this.handlePreviewChange.bind(this)} />
					List of past stories:<br></br>
					<CreatorViewStoriesList storyList={this.state.pastStories} onSelectingStory={this.handlePreviewChange.bind(this)} />

					<CreatorViewPreview previewStory={this.state.previewStory} onFinishingStory={this.handleFinishStory.bind(this)} />
				</div>
			);
		}
	}
}
export default CreatorView
