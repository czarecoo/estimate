import React from 'react';
import './css/CreatorViewPreview.css';
import VoteTable from './VoteTable'
import SocketManager from './SocketManager';

class CreatorViewPreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newStorySummary: "",
			newStoryIssueId: ""
		}
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	startStory(story) {
		SocketManager.startStory(story);
		this.props.closePreview(null);
	}
	createStory(summary, id) {
		SocketManager.createStory(summary, id);
		this.props.closePreview(null);
		this.setState({
			newStorySummary: "",
			newStoryIssueId: ""
		})
	}
	markAsFuture(story) {
		SocketManager.markAsFuture(story);
		this.props.closePreview(null);
	}
	revote(story) {
		SocketManager.revote(story);
		this.props.closePreview(null);
	}
	setActualPreviewStory() {
		var i;
		for (i = 0; i < this.props.data.futureStories.length; i++) {
			if (this.props.data.futureStories[i].issueId === this.props.previewStory.issueId) {
				return this.props.data.futureStories[i];
			}
		}
		for (i = 0; i < this.props.data.currentStory.length; i++) {
			if (this.props.data.currentStory[i].issueId === this.props.previewStory.issueId) {
				return this.props.data.currentStory[i];
			}
		}
		for (i = 0; i < this.props.data.pastStories.length; i++) {
			if (this.props.data.pastStories[i].issueId === this.props.previewStory.issueId) {
				return this.props.data.pastStories[i];
			}
		}
	}
	render() {
		if (this.props.previewStory === null) {
			return null;
		}
		var actualPreview = this.setActualPreviewStory();
		var contentDependingOnStoryTense;
		switch (this.props.previewStory.tense) {
			case -2: {
				contentDependingOnStoryTense = (
					<div>
						Preview Story<button onClick={() => this.props.closePreview(null)}>X</button><br></br>
						<input name="newStoryIssueId" onChange={this.handleChange.bind(this)} placeholder="Enter issueId" value={this.state.newStoryIssueId}></input><br></br>
						<textarea name="newStorySummary" type="text" placeholder="Enter story" onChange={this.handleChange.bind(this)} value={this.state.newStorySummary} style={{ resize: "none", }} readOnly={false} /><br></br>
						<button onClick={this.createStory.bind(this, this.state.newStorySummary, this.state.newStoryIssueId)}>Create story</button>
					</div>
				)
				break;
			}
			case -1: {
				contentDependingOnStoryTense = (
					<div>
						Preview Story<button onClick={() => this.props.closePreview(null)}>X</button><br></br>
						<textarea type="text" value={actualPreview.summary} style={{ resize: "none", }} readOnly={true} /><br></br>
						<button onClick={this.startStory.bind(this, actualPreview)}>Start story</button>
					</div>
				)
				break;
			}
			case 0: {
				contentDependingOnStoryTense = (
					<div>
						Preview Story<button onClick={() => this.props.closePreview(null)}>X</button><br></br>
						<textarea type="text" value={actualPreview.summary} style={{ resize: "none", }} readOnly={true} /><br></br>
						<button onClick={() => this.props.onFinishingStory()}>Finish story</button>
						<button onClick={this.markAsFuture.bind(this, actualPreview)}>Mark as Future</button><br></br>
						Current Votes:<br></br>
						<VoteTable story={actualPreview} />
					</div>
				)
				break;
			}
			case 1: {
				contentDependingOnStoryTense = (
					<div>
						Preview Story<button onClick={() => this.props.closePreview(null)}>X</button><br></br>
						<textarea type="text" value={actualPreview.summary} style={{ resize: "none", }} readOnly={true} /><br></br>
						<button onClick={this.revote.bind(this, actualPreview)}>Revote</button>
						<button onClick={this.markAsFuture.bind(this, actualPreview)}>Mark as future</button><br></br>
						Past Votes:<br></br>
						<VoteTable story={actualPreview} />
					</div>
				)
				break;
			}
			default:
		}
		return (
			<div className="Preview">
				{contentDependingOnStoryTense}
			</div>
		);
	}
}
export default CreatorViewPreview
