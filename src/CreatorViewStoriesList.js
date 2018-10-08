import React from 'react';
import './css/CreatorViewStoriesList.css';
const MAX_CHARS_SHORT_SUMARY = 12;

class CreatorViewStoriesList extends React.Component {
	emptyStory() {
		this.props.onSelectingStory({ tense: -2 });
	}

	render() {
		var stories = this.props.storyList.map((story, i) => {
			return (
				<button key={i} className="btn btn-md btn-primary vote-btn" onClick={() => { this.props.onSelectingStory(story) }}>{story.summary.length > MAX_CHARS_SHORT_SUMARY ? story.summary.substring(0, MAX_CHARS_SHORT_SUMARY) + "..." : story.summary}<br></br>{story.description.length > MAX_CHARS_SHORT_SUMARY ? story.description.substring(0, MAX_CHARS_SHORT_SUMARY) + "..." : story.description}</button>
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
