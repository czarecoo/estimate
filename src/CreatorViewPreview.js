import React from 'react';
import './css/CreatorViewPreview.css';
import VoteTable from './VoteTable'
import SocketManager from './SocketManager';

class CreatorViewPreview extends React.Component {
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	startStory(story) {
		SocketManager.startStory(story);
	}
	markAsFuture(story) {
		SocketManager.markAsFuture(story);
	}
	revote(story) {
		SocketManager.revote(story);
	}

	render() {
		if (this.props.previewStory === null) {
			return null;
		}
		var contentDependingOnStoryTense;
		switch (this.props.previewStory.tense) {
			case -1: {
				contentDependingOnStoryTense = (
					<div>
						<button onClick={this.startStory.bind(this, this.props.previewStory)}>Start story</button>
					</div>
				)
				break;
			}
			case 0: {
				contentDependingOnStoryTense = (
					<div>
						<button onClick={() => this.props.onFinishingStory()}>Finish story</button>
						<button onClick={this.markAsFuture.bind(this, this.props.previewStory)}>Mark as Future</button><br></br>
						Current Votes:<br></br>
						<VoteTable story={this.props.previewStory} />
					</div>
				)
				break;
			}
			case 1: {
				contentDependingOnStoryTense = (
					<div>
						<button onClick={this.revote.bind(this, this.props.previewStory)}>Revote</button>
						<button onClick={this.markAsFuture.bind(this, this.props.previewStory)}>Mark as future</button><br></br>
						Past Votes:<br></br>
						<VoteTable story={this.props.previewStory} />
					</div>
				)
				break;
			}
			default:
		}
		return (
			<div className="Preview">
				Preview Story<br></br>
				<textarea type="text" placeholder="Select story to preview it" defaultValue={this.props.previewStory.summary} style={{ resize: "none", }} readOnly={this.props.previewStory.tense === -1 ? false : true} />
				{contentDependingOnStoryTense}
			</div>
		);
	}
}
export default CreatorViewPreview
