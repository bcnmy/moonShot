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
                <div className="rules-heading">Game Flow</div>
                <div className="launch-page-content">

                    <div id="rule-content-container">
                        <div className="rule-item">
                            <span className="rule-row-heading">
                                <span className="rule-number">1</span>
                                <span className="rule-text-heading">PREPARATION</span>
                            </span>
                            <span className="rule-text">
                                <span>30 seconds average price of matic, called as stake price, is calculated from binancee exchange.</span>
                            </span>
                        </div>
                        <div className="rule-item">
                            <span className="rule-row-heading">
                                <span className="rule-number">2</span>
                                <span className="rule-text-heading">START</span>
                            </span>
                            <span className="rule-text">
                                <span>In Next 30 seconds, you can predict whether the price will go above or below the stake price and invest your money. </span>
                            </span>
                        </div>
                        <div className="rule-item">
                            <span className="rule-row-heading">
                                <span className="rule-number">3</span>
                                <span className="rule-text-heading">WAITING</span>
                            </span>
                            <span className="rule-text">
                                <span>Again, the average price of coin will be calculated in the next 30 seconds. This price is known as result price.</span>
                            </span>
                        </div>
                        <div className="rule-item">
                            <span className="rule-row-heading">
                                <span className="rule-number">4</span>
                                <span className="rule-text-heading">RESULT</span>
                            </span>
                            <span className="rule-text">
                                <span>If your prediction comes true, you win and money will be credited in your account</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default LaunchRightComponent;