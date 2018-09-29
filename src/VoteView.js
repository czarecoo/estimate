import React from 'react';
import './css/VoteView.css';
import VoteViewLoginInfo from './VoteViewLoginInfo'
import VoteViewCurrentStory from './VoteViewCurrentStory'
import VoteViewUsers from './VoteViewUsers'

class VoteView extends React.Component {
	render() {
		return (
			<div className="VoteView">
				<VoteViewLoginInfo data={this.props.data} />
				<div className="row">
					<VoteViewCurrentStory userStory={this.props.data.currentStory[0]} />
					<VoteViewUsers userList={this.props.data.userList} isSuperUser={this.props.data.isSuperUser} />
				</div>
			</div>
		);
	}
}
export default VoteView
