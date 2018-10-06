import React from 'react';
import './css/CreatorViewStoriesList.css';

class CreatorViewStoriesList extends React.Component {
	emptyStory() {
		this.props.onSelectingStory({ tense: -2 });
	}

	render() {
		var stories = this.props.storyList.map((story, i) => {
			return (
				<button key={i} className="btn btn-md btn-primary vote-btn" onClick={() => { this.props.onSelectingStory(story) }}>{story.issueId}<br></br>{story.shortSummary}</button>
			)
		});
		return (
			<div className="StoriesList">
				<table>
					<tbody>
						<tr>
							<th>
								{stories}{this.props.canAdd === true ? <button className="vote-btn btn btn-md btn-primary" onClick={this.emptyStory.bind(this)}>+</button> : null}
							</th>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default CreatorViewStoriesList
