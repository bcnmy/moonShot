import React from 'react';
import './App.css';

import LandingPage from './components/LandingPage';


const LAUNCH = "launch";
const PREPARE = "prepare";
const WAITING = "waiting";
const START='start';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentState: PREPARE
    }
    this.changeState = this.changeState.bind(this);
  }

  changeState(newState) {
    this.setState({currentState: newState});
  }

  render() {
    return (
      <div className="App" id="Home">
        <LandingPage currentState={this.state.currentState} changeState={this.changeState}/>
      </div>
    );
  }
}

export default App;
