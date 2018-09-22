import React from 'react';
import './css/CreatorViewStoriesList.css';

class CreatorViewStoriesList extends React.Component {
	render() {
		const stories = this.props.storyList.map((story, i) => {
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
						</tr>
					</tbody>
				</table>
				<br></br>
			</div>
		);
	}
}
export default CreatorViewStoriesList
