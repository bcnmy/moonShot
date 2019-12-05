import React, { Component } from 'react';
import LaunchRightComponent from './LaunchRightComponent';
import WaitRightComponent from './WaitRightComponent';
import PrepareGameRightComponent from './PrepareGameRightComponent';
import StartGameRightComponent from './StartGameRightComponent';

const LAUNCH = "launch";
const PREPARE = "prepare";
const WAITING = "waiting";
const START='start';

class RightSection extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <section className = "rightSection">
                {this.props.currentState == LAUNCH && <LaunchRightComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState == WAITING && <WaitRightComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState == PREPARE && <PrepareGameRightComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState == START && <StartGameRightComponent changeComponent={this.changeComponent}/>}
            </section>
        );
    }
}

export default RightSection;