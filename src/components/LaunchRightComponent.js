import React, { Component } from 'react';

class LaunchRightComponent extends Component{
    constructor(props) {
        super(props);
        this.changeComponent = props.changeComponent;
        this.showGame = this.showGame.bind(this);
     }
 
     showGame() {
         this.changeComponent("launch");
     }
     render() {
        return(
            <div>
                <div className="current-staking-price">
                    Current Staking Price-Matic
                </div>
                <div className="matic-staking-price">
                    0.02960 matic/usdt
                </div>
            </div>
        );
    }
}
export default LaunchRightComponent;