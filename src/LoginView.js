import React from 'react';
import './css/LoginView.css';

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isJoingSession: false, isSessionWithJira: false, login: '', sessionId: '', jiraurl: 'estimatetest.atlassian.net', jiralogin: 'czarecoo@o2.pl', jirapassword: 'asdqwe123', jiraproject: 'ES' };
	}

	isJoingChange(event) {
		this.setState((prevState) => ({
			isJoingSession: !prevState.isJoingSession
		}));
	}

	isSessionWithJiraChange(event) {
		this.setState((prevState) => ({
			isSessionWithJira: !prevState.isSessionWithJira
		}));
	}

	onLoginChange(event) {
		this.setState({ login: event.target.value });
	}

	onSessionIdChange(event) {
		this.setState({ sessionId: event.target.value });
	}

	onJiraUrlChange(event) {
		this.setState({ jiraurl: event.target.value });
	}

	onJiraLoginChange(event) {
		this.setState({ jiralogin: event.target.value });
	}

	onJiraPasswordChange(event) {
		this.setState({ jirapassword: event.target.value });
	}

	onJiraProjectChange(event) {
		this.setState({ jiraproject: event.target.value });
	}

	attemptConnection() {
		this.props.attemptConnection();
	}

	render() {
		const jiraData = (
			<p>
				<label>Jira Url: </label><br></br>
				<input className="field__input form-control" type="text" value={this.state.jiraurl} onChange={this.onJiraUrlChange.bind(this)} required />
				<br></br>
				<label>Jira Login: </label><br></br>
				<input className="field__input form-control" type="text" value={this.state.jiralogin} onChange={this.onJiraLoginChange.bind(this)} required />
				<br></br>
				<label>Jira Password: </label><br></br>
				<input className="field__input form-control" type="password" value={this.state.jirapassword} onChange={this.onJiraPasswordChange.bind(this)} required />
				<br></br>
				<label>Jira Project Name: </label><br></br>
				<input className="field__input form-control" type="text" value={this.state.jiraproject} onChange={this.onJiraProjectChange.bind(this)} required />
			</p >
		);
		const jiraCheckboxContent = (
			<p>
				<label><input type="checkbox" name="isSessionWithJiraCheckbox" onChange={this.isSessionWithJiraChange.bind(this)} required />Connect with Jira</label>
			</p>
		);
		const joinSessionTextContent = (
			<p>
				Enter sessionID:<br></br>
				<input className="sessionIdText" type="text" value={this.state.sessionId} onChange={this.onSessionIdChange.bind(this)} required />
			</p>
		);
		return (
			<div className="LoginView">
				<p>
					Enter your login:<br></br>
					<input className="loginText" type="text" value={this.state.login} onChange={this.onLoginChange.bind(this)} />
				</p>
				<p>
					Would you like to:<br></br>
					<label><input type="radio" name="isJoiningSessionRadio" checked={!this.state.isJoingSession} onChange={this.isJoingChange.bind(this)} /> Create Session</label>
					<label><input type="radio" name="isJoiningSessionRadio" checked={this.state.isJoingSession} onChange={this.isJoingChange.bind(this)} /> Join Session</label>
				</p>
				{this.state.isJoingSession ? joinSessionTextContent : jiraCheckboxContent}
				{this.state.isSessionWithJira ? jiraData : ""}
				<button type="submit" onClick={this.props.attemptConnection.bind(this)}>{this.state.isJoingSession ? "Join Session" : "Create session"}</button>
			</div>
		);
	}
}

export default LoginView;