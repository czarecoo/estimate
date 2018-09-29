import React from 'react';
import './css/LoginView.css';
import SocketManager from './SocketManager';

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isJoinSession: false, isSessionWithJira: false, login: '', sessionId: '', jiraUrl: 'https://adamjestem.atlassian.net', jiraLogin: 'adam96stan@gmail.com', jiraPassword: 'Cedynia97@', jiraProject: 'ToTylkoDoPobrania' };
	}

	isJoinChange() {
		if (!this.state.isJoinSession && this.state.isSessionWithJira) {
			this.isSessionWithJiraChange();
		}

		this.setState((prevState) => ({
			isJoinSession: !prevState.isJoinSession
		}));
	}

	isSessionWithJiraChange() {
		this.setState((prevState) => ({
			isSessionWithJira: !prevState.isSessionWithJira
		}));
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	tryToConnect() {
		if (this.state.isJoinSession) {
			SocketManager.joinSession(this.state.login, this.state.sessionId);
		} else {
			if (this.state.isSessionWithJira) {
				SocketManager.createSessionWithJira(this.state.login, this.state.jiraLogin, this.state.jiraPassword, this.state.jiraUrl, this.state.jiraProject);
			} else {
				SocketManager.createSession(this.state.login);
			}
		}
	}

	render() {
		const jiraDataTextContent = (
			<p>
				<label>Jira Url: </label><br></br>
				<input className="field__input form-control" name="jiraUrl" type="text" value={this.state.jiraUrl} onChange={this.handleChange.bind(this)} required />
				<br></br>
				<label>Jira Login: </label><br></br>
				<input className="field__input form-control" name="jiraLogin" type="text" value={this.state.jiraLogin} onChange={this.handleChange.bind(this)} required />
				<br></br>
				<label>Jira Password: </label><br></br>
				<input className="field__input form-control" name="jiraPassword" type="password" value={this.state.jiraPassword} onChange={this.handleChange.bind(this)} required />
				<br></br>
				<label>Jira Project Name: </label><br></br>
				<input className="field__input form-control" name="jiraProject" type="text" value={this.state.jiraProject} onChange={this.handleChange.bind(this)} required />
			</p >
		);
		const jiraCheckboxContent = (
			<p>
				<label><input type="checkbox" name="isSessionWithJiraCheckbox" onChange={this.isSessionWithJiraChange.bind(this)} />Connect with Jira</label>
			</p>
		);
		const sessionIdTextContent = (
			<p>
				Enter sessionID:<br></br>
				<input className="sessionIdText" name="sessionId" type="text" value={this.state.sessionId} onChange={this.handleChange.bind(this)} required />
			</p>
		);
		return (
			<div className="LoginView">
				<p>
					Enter your User Name:<br></br>
					<input className="loginText" name="login" type="text" value={this.state.login} onChange={this.handleChange.bind(this)} />
				</p>
				<p>
					Would you like to:<br></br>
					<label><input type="radio" name="isJoiningSessionRadio" checked={!this.state.isJoinSession} onChange={this.isJoinChange.bind(this)} /> Create Session</label>
					<label><input type="radio" name="isJoiningSessionRadio" checked={this.state.isJoinSession} onChange={this.isJoinChange.bind(this)} /> Join Session</label>
				</p>
				{this.state.isJoinSession ? sessionIdTextContent : jiraCheckboxContent}
				{this.state.isSessionWithJira ? jiraDataTextContent : ""}
				<button type="submit" onClick={this.tryToConnect.bind(this)}>{this.state.isJoinSession ? "Join Session" : "Create session"}</button>
			</div>
		);
	}
}

export default LoginView;