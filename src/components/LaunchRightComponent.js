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
                
                <div>
                    <img className="launch-page-img" src="/images/gambling.gif" alt="Biconomy logo white" />
                </div>
            </div>
            
        );
    }
}
export default LaunchRightComponent;