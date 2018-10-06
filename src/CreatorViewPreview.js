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
			case -2: {
				contentDependingOnStoryTense = (
					<div>
						Create new story<button className="vote-btn btn btn-md btn-primary btn-right" onClick={() => this.props.closePreview(null)}>X</button><br></br>
						<input name="newStoryIssueId" className="inputWidth" onChange={this.handleChange.bind(this)} placeholder="Enter issueId" value={this.state.newStoryIssueId}></input><br></br>
						<textarea name="newStorySummary" className="inputWidth" type="text" placeholder="Enter story" onChange={this.handleChange.bind(this)} value={this.state.newStorySummary} style={{ resize: "none", }} readOnly={false} /><br></br>
						<button className="btn btn-md btn-primary vote-btn inputWidth" onClick={this.createStory.bind(this, this.state.newStorySummary, this.state.newStoryIssueId)}><img className="image" src="create.png" alt="submit" /><br></br>Create story</button>
					</div>
				)
				break;
			}
			case -1: {
				contentDependingOnStoryTense = (
					<div>
						Future Story<button className="vote-btn btn btn-md btn-primary btn-right" onClick={() => this.props.closePreview(null)}>X</button><br></br>
						<textarea type="text" className="inputWidth" value={this.props.previewStory.summary} style={{ resize: "none", }} readOnly={true} /><br></br>
						<button className="btn btn-md btn-primary vote-btn inputWidth" onClick={this.startStory.bind(this, this.props.previewStory)}><img className="image" src="finish.png" alt="submit" /><br></br>Start story</button>
					</div>
				)
				break;
			}
			case 0: {
				contentDependingOnStoryTense = (
					<div>
						Current Story<button className="vote-btn btn btn-md btn-primary btn-right" onClick={() => this.props.closePreview(null)}>X</button><br></br>
						<textarea type="text" className="inputWidth" value={this.props.previewStory.summary} style={{ resize: "none", }} readOnly={true} /><br></br>
						<button className="btn btn-md btn-primary vote-btn" onClick={() => this.props.onFinishingStory()}><img className="image" src="finish.png" alt="submit" /><br></br>Finish story</button>
						<button className="btn btn-md btn-primary vote-btn" onClick={this.markAsFuture.bind(this, this.props.previewStory)}><img className="image" src="send.png" alt="submit" /><br></br>Mark as Future</button><br></br>
						Current Votes:<br></br>
						<VoteTable story={this.props.previewStory} isFinal={false} />
					</div>
				)
				break;
			}
			case 1: {
				contentDependingOnStoryTense = (
					<div>
						Finished Story<button className="vote-btn btn btn-md btn-primary btn-right" onClick={() => this.props.closePreview(null)}>X</button><br></br>
						<textarea type="text" className="inputWidth" value={this.props.previewStory.summary} style={{ resize: "none", }} readOnly={true} /><br></br>
						<button className="btn btn-md btn-primary vote-btn" onClick={this.revote.bind(this, this.props.previewStory)}><img className="image" src="FinalRevote.png" alt="submit" /><br></br>Revote</button>
						<button className="btn btn-md btn-primary vote-btn" onClick={this.markAsFuture.bind(this, this.props.previewStory)}><img className="image" src="send.png" alt="submit" /><br></br>Mark as future</button><br></br>
						Past Votes:<br></br>
						<VoteTable story={this.props.previewStory} isFinal={true} />
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
