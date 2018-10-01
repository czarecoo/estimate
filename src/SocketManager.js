import React from 'react';

class SocketManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoggedIn: false };
	}
	static setSocket(s) {
		this.socket = s;
	}
	static addListeners(handleUpdate) {
		this.socket.on('updateResponse', (data) => handleUpdate(data));
		this.socket.on('activityRequest', () => this.socket.emit('activityResponse'));
		this.socket.on('sessionClosingCommand', () => window.location.reload());
		this.socket.on('coffeeCommand', (userName) => alert(userName + " asked for coffee break."));
	}
	static removeListeners(handleUpdate) {
		this.socket.removeListener('updateResponse', (data) => handleUpdate(data));
		this.socket.removeListener('activityRequest', () => this.socket.emit('activityResponse'));
		this.socket.removeListener('sessionClosingCommand', () => window.location.reload());
		this.socket.removeListener('coffeeCommand', (userName) => alert(userName + " asked for coffee break."));
	}
	static createSession(userName) {
		this.socket.emit('createSessionRequest', userName);
	}
	static createSessionWithJira(userName, jiraLogin, jiraPassword, jiraUrl, jiraProject) {
		this.socket.emit('createSessionWithJiraRequest', userName, jiraLogin, jiraPassword, jiraUrl, jiraProject);
	}
	static joinSession(userName, serverId) {
		this.socket.emit('joinSessionRequest', userName, serverId);
	}
	static closeSession() {
		this.socket.emit('closeSessionRequest');
	}
	static vote(vote) {
		this.socket.emit('voteRequest', vote);
	}
	static coffee() {
		alert("You asked for coffee break.");
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
	static createStory(summary, issueId) {
		this.socket.emit('createStoryRequest', summary, issueId);
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