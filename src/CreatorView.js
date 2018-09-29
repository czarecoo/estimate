import React from 'react';
import './css/CreatorView.css';
import CreatorViewStoriesList from './CreatorViewStoriesList'
import CreatorViewPreview from './CreatorViewPreview'
import VoteTable from './VoteTable'
import CreatorViewFinalVote from './CreatorViewFinalVote'


class CreatorView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFinishingStory: false,
			previewStory: null,
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
		return (this.props.data.futureStories.length + this.props.data.currentStory.length + this.props.data.pastStories.length);
	}
	render() {
		if (this.state.isFinishingStory) {
			return (
				<div className="CreatorFinishStoryView">
					<button onClick={this.handleFinishStory.bind(this)}>Abort finish story</button>

					Current Vote:
					<VoteTable story={this.state.previewStory} />
					<CreatorViewFinalVote userStory={this.state.previewStory} onFinishStory={this.handleFinishStory.bind(this)} />
				</div>
			);
		} else {
			return (
				<div className="CreatorView">
					<label>How many voted on current story:</label>{this.props.data.currentStory[0].votes.length} / {this.props.data.userList.length}<br></br>
					<label>Finished stories:</label>{this.props.data.pastStories.length} / {this.sumStories()}<br></br>
					List of future stories:<br></br>
					<CreatorViewStoriesList storyList={this.props.data.futureStories} onSelectingStory={this.handlePreviewChange.bind(this)} />
					Current Story:<br></br>
					<CreatorViewStoriesList storyList={this.props.data.currentStory} onSelectingStory={this.handlePreviewChange.bind(this)} />
					List of past stories:<br></br>
					<CreatorViewStoriesList storyList={this.props.data.pastStories} onSelectingStory={this.handlePreviewChange.bind(this)} />

					<CreatorViewPreview previewStory={this.state.previewStory} onFinishingStory={this.handleFinishStory.bind(this)} />
				</div>
			);
		}
	}
}
export default CreatorView
