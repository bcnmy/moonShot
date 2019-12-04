import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class Header extends Component{
    constructor(props) {
        super(props);
        this.changeState = props.changeState;
        this.displayHome = this.displayHome.bind(this);
     }
 
     displayHome() {
         this.changeState("launch");
     }
 
    render(){ 
        return(
            <section className = "menu-bar" id="top">
                <div className="gameName"> 
                    <div className="game-shortform" onClick={this.displayHome}> G T P </div>
                    <div className="game-fullform"> Guess The Price </div>
                </div>
            </section>
        );
    }
}

export default Header;