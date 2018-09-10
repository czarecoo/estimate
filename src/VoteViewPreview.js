import React from 'react';
import './css/VoteViewPreview.css';
import VoteViewVoteTable from './VoteViewVoteTable'

class VoteViewPreview extends React.Component {
	constructor(props) {
		super(props);
		this.previewStory = this.props.previewStory;
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	render() {
		if (this.previewStory === undefined || this.previewStory.summary === undefined) {
			return null;
		}

		var contentDependingOnStoryTense;
		switch (this.previewStory.tense) {
			case -1: {
				contentDependingOnStoryTense = (<div><button>Start story</button></div>)
				break;
			}
			case 0: {
				contentDependingOnStoryTense = (<div><button>Finish story</button> Current Votes:< VoteViewVoteTable story={this.previewStory} /></div>)
				break;
			}
			case 1: {
				contentDependingOnStoryTense = (<div><button>Revote</button> Past Votes:< VoteViewVoteTable story={this.previewStory} /></div>)
				break;
			}
			default:
		}
		return (
			<div className="VoteViewPreview">
				Preview Story<br></br>
				<textarea type="text" placeholder="Select story to preview it" defaultValue={this.previewStory.summary} style={{ resize: "none", }} />
				{contentDependingOnStoryTense}
			</div>
		);
	}
}
export default VoteViewPreview
