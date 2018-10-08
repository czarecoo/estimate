import React from 'react';
import './css/LoginView.css';
import SocketManager from './SocketManager';
import AlertManager from './AlertManager';

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isJoinSession: false, isSessionWithJira: false,
			login: "user" + (Math.round(Math.random() * 100)), sessionId: '',
			jiraUrl: 'https://jiraczareg.atlassian.net', jiraLogin: '187842@edu.p.lodz.pl',
			jiraPassword: '4funrulez', jiraProject: 'PrzykladowyProjekt', jiraProjectKey: 'PRZYK'
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
		if (this.state.login !== "") {
			if (this.state.isJoinSession) {
				SocketManager.joinSession(this.state.login, this.state.sessionId);
			} else {
				if (this.state.isSessionWithJira) {
					SocketManager.createSessionWithJira(this.state.login, this.state.jiraLogin, this.state.jiraPassword, this.state.jiraUrl, this.state.jiraProject, this.state.jiraProjectKey);
				} else {
					SocketManager.createSession(this.state.login);
				}
			}
		} else {
			AlertManager.error("Please enter correct user name");
		}

	}

	render() {
		const jiraDataTextContent = (
			<p>
				<label>Jira Url:</label><br></br>
				<input className="fullWidth" name="jiraUrl" type="text" value={this.state.jiraUrl} onChange={this.handleChange.bind(this)} required />
				<br></br><label>Jira Login:</label><br></br>
				<input className="fullWidth" name="jiraLogin" type="text" value={this.state.jiraLogin} onChange={this.handleChange.bind(this)} required />
				<br></br><label>Jira Password:</label><br></br>
				<input className="fullWidth" name="jiraPassword" type="password" value={this.state.jiraPassword} onChange={this.handleChange.bind(this)} required />
				<br></br><label>Jira Project Key:</label><br></br>
				<input className="fullWidth" name="jiraProjectKey" type="text" value={this.state.jiraProjectKey} onChange={this.handleChange.bind(this)} required />
				<br></br><label>Jira Project Name:</label><br></br>
				<input className="fullWidth" name="jiraProject" type="text" value={this.state.jiraProject} onChange={this.handleChange.bind(this)} required />
				<br></br>Jira Url, Login, Password and Project Key are required to fetch issues from jira.<br></br>
				All fields are required to send issues created in this app to jira.
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
				<input className="sessionIdText fullWidth" name="sessionId" type="text" value={this.state.sessionId} onChange={this.handleChange.bind(this)} required />
			</p>
		);
		return (
			<div className="LoginView">
				Name:<br></br>
				<input className="loginText fullWidth" placeholder="Enter your User Name" name="login" type="text" value={this.state.login} onChange={this.handleChange.bind(this)} /><br></br>
				<label><input type="radio" name="isJoiningSessionRadio" checked={!this.state.isJoinSession} onChange={this.isJoinChange.bind(this)} /> Create Session</label><br></br>
				<label><input type="radio" name="isJoiningSessionRadio" checked={this.state.isJoinSession} onChange={this.isJoinChange.bind(this)} /> Join Session</label><br></br>
				{this.state.isJoinSession ? sessionIdTextContent : jiraCheckboxContent}
				{this.state.isSessionWithJira ? jiraDataTextContent : ""}
				<button type="submit" className="btn btn-md btn-primary vote-btn btn-center" onClick={this.tryToConnect.bind(this)}><img className="image" src="create.png" alt="submit" /><br></br>{this.state.isJoinSession ? "Join Session" : "Create session"}</button>
			</div>
		);
	}
}

export default LoginView;