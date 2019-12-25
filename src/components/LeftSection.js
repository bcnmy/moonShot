import React, { Component } from 'react';
import LaunchLeftComponent from './LaunchLeftComponent';
import WaitLeftComponent from './WaitLeftComponent';
import PrepareGameLeftComponent from './PrepareGameLeftComponent';
import StartGameLeftComponent from './StartGameLeftComponent';
import ResultLeftComponent from './ResultLeftComponent';

const {config} = require("./../config");
const {LAUNCH, PREPARE, WAITING, START, RESULT} = config.state;

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
                {this.props.currentState === LAUNCH && <LaunchLeftComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState === PREPARE &&
                    <PrepareGameLeftComponent changeComponent={this.changeComponent} counter={this.props.counter} />
                }
                {this.props.currentState === START &&
                    <StartGameLeftComponent changeComponent={this.changeComponent} counter={this.props.counter}/>
                }
                {this.props.currentState === WAITING &&
                    <WaitLeftComponent changeComponent={this.changeComponent} getPrice={this.props.getPrice}
                    counter={this.props.counter}/>
                }
                {this.props.currentState === RESULT &&
                    <ResultLeftComponent changeComponent={this.changeComponent} counter={this.props.counter}/>
                }
            </section>
        );
    }
}

export default LeftSection;