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
	render() {
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
						Finish Story <button onClick={this.handleFinishStory.bind(this)}>X</button><br></br>
						<VoteTable story={this.state.previewStory} />
						<CreatorViewFinalVote userStory={this.state.previewStory} onFinishStory={this.handleFinishStory.bind(this)} closePreview={this.handlePreviewChange.bind(this)} />
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
						<CreatorViewPreview previewStory={this.state.previewStory} onFinishingStory={this.handleFinishStory.bind(this)} closePreview={this.handlePreviewChange.bind(this)} />
					</div>
				</div>
			);
		}
	}
}
export default CreatorView
