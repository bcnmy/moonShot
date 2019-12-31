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
                    <ul>
                        <li>Game is divided into three session </li><br/>
                        <li>15 sec spot price of matic is selected from the binance	</li><br/>
                        <li>Next 30 secs you can predict the price of matic whether it will go up or down </li><br/>
                        <li>Wohoa!!, if your prediction comes true, you become a trading champ</li>
                    </ul>
                </div>
            </div>

        );
    }
}
export default LaunchRightComponent;