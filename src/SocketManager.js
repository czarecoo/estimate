import React from 'react';
import AlertManager from './AlertManager';

class SocketManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoggedIn: false };
	}
	static setSocket(s) {
		this.socket = s;
	}
	static addListeners(handleUpdate, cookies, logout) {
		this.socket.on('updateResponse', (data) => handleUpdate(data));
		this.socket.on('activityRequest', () => this.socket.emit('activityResponse'));
		this.socket.on('sessionClosingCommand', () => {
			cookies.remove("login");
			cookies.remove("userId");
			cookies.remove("sessionId");
			logout();
		});
		this.socket.on('coffeeCommand', (userName) => AlertManager.show(userName + " asked for coffee break."));
		this.socket.on('errorCommand', (msg) => AlertManager.show(msg));
	}
	static removeListeners(handleUpdate, cookies, logout) {
		this.socket.removeListener('updateResponse', (data) => handleUpdate(data));
		this.socket.removeListener('activityRequest', () => this.socket.emit('activityResponse'));
		this.socket.removeListener('sessionClosingCommand', () => {
			cookies.remove("login");
			cookies.remove("userId");
			cookies.remove("sessionId");
			logout();
		});
		this.socket.removeListener('coffeeCommand', (userName) => AlertManager.show(userName + " asked for coffee break."));
		this.socket.removeListener('errorCommand', (msg) => AlertManager.show(msg));
	}
	static createSession(userName) {
		this.socket.emit('createSessionRequest', userName);
	}
	static createSessionWithJira(userName, jiraLogin, jiraPassword, jiraUrl, jiraProject, jiraProjectKey) {
		this.socket.emit('createSessionWithJiraRequest', userName, jiraLogin, jiraPassword, jiraUrl, jiraProject, jiraProjectKey);
	}
	static joinSession(userName, serverId) {
		this.socket.emit('joinSessionRequest', userName, serverId);
	}
	static rejoinSession(login, userId, sessionId) {
		this.socket.emit('rejoinSessionRequest', login, userId, sessionId);
	}
	static closeSession() {
		this.socket.emit('closeSessionRequest');
	}
	static leaveSession() {
		this.socket.emit('leaveSessionRequest');
	}
	static vote(vote) {
		this.socket.emit('voteRequest', vote);
	}
	static coffee() {
		AlertManager.show("You asked for coffee break.");
		this.socket.emit('coffeeRequest');
	}
	static kick(user) {
		this.socket.emit('kickRequest', user);
	}
	static passCreator(user) {
		this.socket.emit('passCreatorRequest', user);
	}
	static startStory(story) {
		this.socket.emit('startStoryRequest', story);
	}
	static createStory(summary, description) {
		this.socket.emit('createStoryRequest', summary, description);
	}
	static finishStory(story, finalScore) {
		this.socket.emit('finishStoryRequest', story, finalScore);
	}
	static markAsFuture(story) {
		this.socket.emit('markAsFutureRequest', story);
	}
	static revote(story) {
		this.socket.emit('revoteRequest', story);
	}
	static getSocketId() {
		return this.socket.id;
	}
}
export default SocketManager;