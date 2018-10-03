import React from 'react';
import './css/LoginView.css';
import SocketManager from './SocketManager';

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isJoinSession: false, isSessionWithJira: false,
			login: "user" + (Math.round(Math.random() * 100)), sessionId: '',
			jiraUrl: 'https://adamjestem.atlassian.net', jiraLogin: 'adam96stan@gmail.com',
			jiraPassword: 'Cedynia97@', jiraProject: 'ToTylkoDoPobrania', jiraProjectKey: 'TOT'
		};
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
				SocketManager.createSessionWithJira(this.state.login, this.state.jiraLogin, this.state.jiraPassword, this.state.jiraUrl, this.state.jiraProject, this.state.jiraProjectKey);
			} else {
				SocketManager.createSession(this.state.login);
			}
		}
	}

	render() {
		const jiraDataTextContent = (
			<p>
				<label>Jira Url: </label><br></br>
				<input className="" name="jiraUrl" type="text" value={this.state.jiraUrl} onChange={this.handleChange.bind(this)} required />
				<br></br><label>Jira Login: </label><br></br>
				<input className="" name="jiraLogin" type="text" value={this.state.jiraLogin} onChange={this.handleChange.bind(this)} required />
				<br></br><label>Jira Password: </label><br></br>
				<input className="" name="jiraPassword" type="password" value={this.state.jiraPassword} onChange={this.handleChange.bind(this)} required />
				<br></br><label>Jira Project Name: </label><br></br>
				<input className="" name="jiraProject" type="text" value={this.state.jiraProject} onChange={this.handleChange.bind(this)} required />
				<br></br><label>Jira Project Key: </label><br></br>
				<input className="" name="jiraProjectKey" type="text" value={this.state.jiraProjectKey} onChange={this.handleChange.bind(this)} required />
			</p>
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
				Name:<br></br>
				<input className="loginText" placeholder="Enter your User Name" name="login" type="text" value={this.state.login} onChange={this.handleChange.bind(this)} /><br></br>
				<label><input type="radio" name="isJoiningSessionRadio" checked={!this.state.isJoinSession} onChange={this.isJoinChange.bind(this)} /> Create Session</label><br></br>
				<label><input type="radio" name="isJoiningSessionRadio" checked={this.state.isJoinSession} onChange={this.isJoinChange.bind(this)} /> Join Session</label><br></br>
				{this.state.isJoinSession ? sessionIdTextContent : jiraCheckboxContent}
				{this.state.isSessionWithJira ? jiraDataTextContent : ""}
				<button type="submit" className="btn btn-md btn-primary btn-transparent btn-center" onClick={this.tryToConnect.bind(this)}><img className="image" src="create.png" alt="submit" /><br></br>{this.state.isJoinSession ? "Join Session" : "Create session"}</button>
			</div>
		);
	}
}

export default LoginView;