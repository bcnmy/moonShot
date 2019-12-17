import React, { Component } from 'react';
import LaunchLeftComponent from './LaunchLeftComponent';
import WaitLeftComponent from './WaitLeftComponent';
import PrepareGameLeftComponent from './PrepareGameLeftComponent';
import StartGameLeftComponent from './StartGameLeftComponent';
import ResultLeftComponent from './ResultLeftComponent';

const LAUNCH = "launch";
const PREPARE = "prepare";
const START='start';
const WAITING = "waiting";
const RESULT = "result";


class LeftSection extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentState: props.currentState
        }
        this.changeState = props.changeState;
        
        this.changeComponent = this.changeComponent.bind(this);
    }

    changeComponent(newState) {
        this.changeState(newState);
    }

    render() {
        return(
            <section className = "leftSection">
                {this.props.currentState == LAUNCH && <LaunchLeftComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState == PREPARE && <PrepareGameLeftComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState == START && <StartGameLeftComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState == WAITING && <WaitLeftComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState == RESULT && <ResultLeftComponent changeComponent={this.changeComponent}/>}
            </section>
        );
    }
}

export default LeftSection;