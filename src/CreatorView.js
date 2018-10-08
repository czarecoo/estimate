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
		if (story !== null && (this.state.previewStory === null || (this.state.previewStory.summary !== story.summary && this.state.previewStory.description !== story.description))) {
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
				if (this.props.data.futureStories[i].summary === this.state.previewStory.summary && this.props.data.futureStories[i].description === this.state.previewStory.description) {
					return this.props.data.futureStories[i];
				}
			}
			for (i = 0; i < this.props.data.currentStory.length; i++) {
				if (this.props.data.currentStory[i].summary === this.state.previewStory.summary && this.props.data.currentStory[i].description === this.state.previewStory.description) {
					return this.props.data.currentStory[i];
				}
			}
			for (i = 0; i < this.props.data.pastStories.length; i++) {
				if (this.props.data.pastStories[i].summary === this.state.previewStory.summary && this.props.data.pastStories[i].description === this.state.previewStory.description) {
					return this.props.data.pastStories[i];
				}
			}
		} else {
			return null;
		}
	}
	render() {
		var actualPreview = this.setActualPreviewStory();
		var contentDependingOnState;
		if (this.state.isFinishingStory) {
			contentDependingOnState = (
				<div className="col-xs-12 col-md-8 col-lg-8 col-xl-8">
					Finish Story <button className="vote-btn btn btn-md btn-primary btn-right" onClick={this.handleFinishStory.bind(this)}>X</button><br></br>
					<VoteTable story={actualPreview} isFinal={false} />
					<CreatorViewFinalVote scores={this.props.scores} userStory={actualPreview} onFinishStory={this.handleFinishStory.bind(this)} closePreview={this.handlePreviewChange.bind(this)} />
				</div>
			)
		} else {
			contentDependingOnState = (
				<div className="col-xs-12 col-md-8 col-lg-8 col-xl-8">
					<CreatorViewPreview previewStory={actualPreview} data={this.props.data} onFinishingStory={this.handleFinishStory.bind(this)} closePreview={this.handlePreviewChange.bind(this)} />
				</div>
			)
		}
		return (
			<div className="CreatorView row">
				<div className="col-xs-12 col-md-4 col-lg-4 col-xl-4">
					<hr className="style13"></hr>
					List of future stories:<br></br>
					<CreatorViewStoriesList storyList={this.props.data.futureStories} onSelectingStory={this.handlePreviewChange.bind(this)} canAdd={true} />
					<hr className="style13"></hr>
					Current Story:<br></br>
					<CreatorViewStoriesList storyList={this.props.data.currentStory} onSelectingStory={this.handlePreviewChange.bind(this)} canAdd={false} />
					<hr className="style13"></hr>
					List of finished stories:<br></br>
					<CreatorViewStoriesList storyList={this.props.data.pastStories} onSelectingStory={this.handlePreviewChange.bind(this)} canAdd={false} />
					<hr className="style13"></hr>
				</div>
				{contentDependingOnState}
			</div>
		);
	}
}
export default CreatorView
