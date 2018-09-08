import React from 'react';
import './css/VoteView.css';

class VoteView extends React.Component {
	render() {
		return (
			<div className="VoteView">
				<h1>Vote</h1>
				<button onClick={window.location.reload()}>Close session</button>
			</div>
		);
	}
}
export default VoteView
