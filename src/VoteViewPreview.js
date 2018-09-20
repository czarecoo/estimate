import React from 'react';
import './css/VoteViewPreview.css';
import VoteViewVoteTable from './VoteViewVoteTable'

class VoteViewPreview extends React.Component {
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	render() {
		if (this.props.previewStory === null) {
			return null;
		}
		var contentDependingOnStoryTense;
		switch (this.props.previewStory.tense) {
			case -1: {
				contentDependingOnStoryTense = (<div><button>Start story</button></div>)
				break;
			}
			case 0: {
				contentDependingOnStoryTense = (<div><button>Finish story</button><button>Mark as Future</button><br></br> Current Votes:<br></br>< VoteViewVoteTable story={this.props.previewStory} /></div>)
				break;
			}
			case 1: {
				contentDependingOnStoryTense = (<div><button>Revote</button><button>Mark as future</button><br></br> Past Votes:<br></br>< VoteViewVoteTable story={this.props.previewStory} /></div>)
				break;
			}
			default:
		}
		return (
			<div className="VoteViewPreview">
				<button onClick={() => { this.props.onClosingPreview(null) }}>Close Preview</button><br></br>
				Preview Story<br></br>
				<textarea type="text" placeholder="Select story to preview it" defaultValue={this.props.previewStory.summary} style={{ resize: "none", }} />
				{contentDependingOnStoryTense}
			</div>
		);
	}
}
export default VoteViewPreview
