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
		this.setState({ isFinishingStory: false });
		if (story !== null && story.tense === -2) {
			this.setState({ previewStory: story });
		}
		if (story !== null && (this.state.previewStory === null || this.state.previewStory.issueId !== story.issueId)) {
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
	setActualPreviewStory() {
		if (this.state.previewStory != null) {
			if (this.state.previewStory.tense === -2) {
				return this.state.previewStory;
			}
			var i;
			for (i = 0; i < this.props.data.futureStories.length; i++) {
				if (this.props.data.futureStories[i].issueId === this.state.previewStory.issueId) {
					return this.props.data.futureStories[i];
				}
			}
			for (i = 0; i < this.props.data.currentStory.length; i++) {
				if (this.props.data.currentStory[i].issueId === this.state.previewStory.issueId) {
					return this.props.data.currentStory[i];
				}
			}
			for (i = 0; i < this.props.data.pastStories.length; i++) {
				if (this.props.data.pastStories[i].issueId === this.state.previewStory.issueId) {
					return this.props.data.pastStories[i];
				}
			}
		} else {
			return null;
		}
	}
	render() {
		var actualPreview = this.setActualPreviewStory();
		if (this.state.isFinishingStory) {
			return (
				<div className="CreatorView row">
					<div className="col-xs-12 col-md-4 col-lg-4 col-xl-4">
						List of future stories:<br></br>
						<CreatorViewStoriesList storyList={this.props.data.futureStories} onSelectingStory={this.handlePreviewChange.bind(this)} canAdd={true} />
						Current Story:<br></br>
						<CreatorViewStoriesList storyList={this.props.data.currentStory} onSelectingStory={this.handlePreviewChange.bind(this)} canAdd={false} />
						List of finished stories:<br></br>
						<CreatorViewStoriesList storyList={this.props.data.pastStories} onSelectingStory={this.handlePreviewChange.bind(this)} canAdd={false} />
					</div>
					<div className="col-xs-12 col-md-8 col-lg-8 col-xl-8">
						Finish Story <button className="vote-btn btn btn-md btn-primary btn-right" onClick={this.handleFinishStory.bind(this)}>X</button><br></br>
						<VoteTable story={actualPreview} isFinal={false} />
						<CreatorViewFinalVote scores={this.props.scores} userStory={actualPreview} onFinishStory={this.handleFinishStory.bind(this)} closePreview={this.handlePreviewChange.bind(this)} />
					</div>
				</div>
			);
		} else {
			return (
				<div className="CreatorView row">
					<div className="col-xs-12 col-md-4 col-lg-4 col-xl-4">
						List of future stories:<br></br>
						<CreatorViewStoriesList storyList={this.props.data.futureStories} onSelectingStory={this.handlePreviewChange.bind(this)} canAdd={true} />
						Current Story:<br></br>
						<CreatorViewStoriesList storyList={this.props.data.currentStory} onSelectingStory={this.handlePreviewChange.bind(this)} canAdd={false} />
						List of finished stories:<br></br>
						<CreatorViewStoriesList storyList={this.props.data.pastStories} onSelectingStory={this.handlePreviewChange.bind(this)} canAdd={false} />
					</div>
					<div className="col-xs-12 col-md-8 col-lg-8 col-xl-8">
						<CreatorViewPreview previewStory={actualPreview} data={this.props.data} onFinishingStory={this.handleFinishStory.bind(this)} closePreview={this.handlePreviewChange.bind(this)} />
					</div>
				</div>
			);
		}
	}
}
export default CreatorView
