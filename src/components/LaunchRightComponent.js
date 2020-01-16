import React, { Component } from 'react';

const {config} = require("./../config");
const {LAUNCH} = config.state;

class LaunchRightComponent extends Component{
    constructor(props) {
        super(props);
        this.changeComponent = props.changeComponent;
        this.showGame = this.showGame.bind(this);
     }

     showGame() {
         this.changeComponent(LAUNCH);
     }
     render() {
        return(
            <div className="launch-right-section">
                <div className="rules-heading">Game Rules</div>
                <div className="launch-page-content">

                    <div id="rule-content-container">
                        <div className="rule-item">
                            <span className="rule-row-heading">
                                <span className="rule-number">1</span>
                                <span className="rule-text-heading">PREPARATION</span>
                            </span>
                            <span className="rule-text">
                                <span>Average price of the coin, called as Stake Price, is calculated. </span>
                            </span>
                        </div>
                        <div className="rule-item">
                            <span className="rule-row-heading">
                                <span className="rule-number">2</span>
                                <span className="rule-text-heading">START</span>
                            </span>
                            <span className="rule-text">
                                <span>Predict and bet whether the price will go UP or DOWN.</span>
                            </span>
                        </div>
                        <div className="rule-item">
                            <span className="rule-row-heading">
                                <span className="rule-number">3</span>
                                <span className="rule-text-heading">WAITING</span>
                            </span>
                            <span className="rule-text">
                                <span>Again the average price, called as Result Price, is calculated.</span>
                            </span>
                        </div>
                        <div className="rule-item">
                            <span className="rule-row-heading">
                                <span className="rule-number">4</span>
                                <span className="rule-text-heading">RESULT</span>
                            </span>
                            <span className="rule-text">
                                <span>Whoa!!...</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default LaunchRightComponent;