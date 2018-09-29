import React from 'react';
import './css/CreatorViewStoriesList.css';

class CreatorViewStoriesList extends React.Component {
	emptyStory() {
		this.props.onSelectingStory({ tense: -2 });
	}

	render() {
		var stories = this.props.storyList.map((story, i) => {
			return (
				<button key={i} onClick={() => { this.props.onSelectingStory(story) }}>{story.issueId}<br></br>{story.shortSummary}</button>
			)
		});
		return (
			<div className="StoriesList">
				<table>
					<tbody>
						<tr>
							<th>
								{stories}{this.props.canAdd === true ? <button onClick={this.emptyStory.bind(this)}>+</button> : null}
							</th>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default CreatorViewStoriesList
