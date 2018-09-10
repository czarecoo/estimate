import React from 'react';
import './css/VoteViewStoriesList.css';

class VoteViewStoriesList extends React.Component {
	render() {
		const stories = this.props.storyList.map((story, i) => {
			return (
				<button key={i}>{story.issueId}<br></br>{story.shortSummary}</button>
			)
		});
		return (
			<div className="VoteViewStoriesList">
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
export default VoteViewStoriesList
