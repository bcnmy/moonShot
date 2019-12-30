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
                {this.props.currentState === LAUNCH && <LaunchRightComponent changeComponent={this.changeComponent}/>}
                {this.props.currentState === PREPARE &&
                    <PrepareGameRightComponent changeComponent={this.changeComponent}
                        requestCurrentPrice={this.props.requestCurrentPrice} lastPrice={this.props.lastPrice}
                        lastPriceUnit={this.props.lastPriceUnit}/>
                }
                {this.props.currentState === START &&
                    <StartGameRightComponent changeComponent={this.changeComponent} betUpList={this.props.betUpList}
                    betDownList={this.props.betDownList}/>
                }
                {this.props.currentState === WAITING &&
                    <WaitRightComponent changeComponent={this.changeComponent} betUpList={this.props.betUpList}
                    betDownList={this.props.betDownList}/>
                }
                {this.props.currentState === RESULT &&
                    <ResultRightComponent changeComponent={this.changeComponent} winners={this.props.winners}
                    loosers={this.props.loosers} resultBetValue={this.props.resultBetValue} userAddress={this.props.userAddress}
                    betPlaced={this.props.betPlaced} />}
            </section>
        );
    }
}

export default RightSection;