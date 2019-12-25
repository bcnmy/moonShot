import React, { Component } from 'react';
import LaunchRightComponent from './LaunchRightComponent';
import WaitRightComponent from './WaitRightComponent';
import PrepareGameRightComponent from './PrepareGameRightComponent';
import StartGameRightComponent from './StartGameRightComponent';
import ResultRightComponent from './ResultRightComponent';

const {config} = require("./../config");
const {LAUNCH, PREPARE, WAITING, START, RESULT} = config.state;

class RightSection extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className = "rightSection">
                {this.props.currentState == LAUNCH && <LaunchRightComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState == PREPARE && <PrepareGameRightComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState == START && <StartGameRightComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState == WAITING && <WaitRightComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState == RESULT && <ResultRightComponent changeComponent={this.changeComponent}/>}
            </section>
        );
    }
}

export default RightSection;