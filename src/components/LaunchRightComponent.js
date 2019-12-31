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
                            <span className="rule-number">1</span>
                            <span className="rule-text">15 sec Matic price is selected</span>
                        </div>
                        <div className="rule-item">
                            <span className="rule-number">2</span>
                            <span className="rule-text">Predict whether price will go UP or DOWN</span>
                        </div>
                        <div className="rule-item">
                            <span className="rule-number">3</span>
                            <span className="rule-text">Matic average price is again calculated</span>
                        </div>
                        <div className="rule-item">
                            <span className="rule-number">4</span>
                            <span className="rule-text">Wohoa!!, If your prediction comes true, you become a trading champ</span>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default LaunchRightComponent;