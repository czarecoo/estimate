import React from 'react';
import './css/MainView.css';
import VoteView from './VoteView'
import LoginView from './LoginView'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  change(event) {
    socket.emit('change');
    this.setState((prevState) => ({
      isLoggedIn: !prevState.isLoggedIn
    }));
  }

  render() {
    if(this.state.isLoggedIn){
      return (
        <div className="VoteView">
          <VoteView socket={socket}/>   
          <button onClick={this.change.bind(this)}>Go to Login</button> 
        </div>
      );
    }else{
      return (
        <div className="LoginView">
          <LoginView socket={socket}/> 
          <button onClick={this.change.bind(this)}>Go to Vote</button>    
        </div>
      );
    }
  }
}

export default MainView;
