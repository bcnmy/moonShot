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
            <div>

                <div>
                    <img className="launch-page-img" src="/images/gamble.png" alt="Biconomy logo white" />
                </div>
            </div>

        );
    }
}
export default LaunchRightComponent;