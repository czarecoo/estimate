import React from 'react';
import './css/VoteViewCurrentStory.css';
import VoteViewVoteTable from './VoteViewVoteTable'

class VoteViewCurrentStory extends React.Component {
	render() {
		return (
			<div className="VoteViewCurrentStory">
				Current Story<br></br>
				<textarea className="" name="userStory" type="text" placeholder="" value={this.props.userStory} style={{ resize: "none", }} readOnly />
				<table className="buttons">
					<tbody>
						<tr>
							<th><button className="" ref='a1' value={1}>1</button></th>
							<th><button className="" ref='a2' value={2}>2</button></th>
							<th><button className="" ref='a3' value={3}>3</button></th>
							<th><button className="" ref='a5' value={5}>5</button></th>
							<th><button className="" ref='a8' value={8}>8</button></th>
							<th><button className="" ref='a13' value={13}>13</button></th>
							<th><button className="" ref='a21' value={21}>21</button></th>
							<th><button className="" ref='a0' value={0}>?</button></th>
							<th><button className="" >Cofffe</button></th>
						</tr>
					</tbody>
				</table>
				Current Votes:
				< VoteViewVoteTable story={this.props.userStory} />
			</div>
		);
	}
}
export default VoteViewCurrentStory
