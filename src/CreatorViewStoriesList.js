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
							<th>{stories}</th>
							{this.props.canAdd === true ? <th><button onClick={this.emptyStory.bind(this)}>+</button></th> : null}
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default CreatorViewStoriesList
