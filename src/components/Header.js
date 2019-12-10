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
                <div className="login-section">
                    <Button id="login-button" className={`gtp-buttons ${this.props.userLogin ? "hidden":""}`} variant="contained"
                        onClick={this.props.onLogin}>
                        Login
                    </Button>
                    <div id="logged-in-user-info" className={this.props.userLogin ? "user-info-container":"hidden"}>

                    </div>
                </div>
            </section>
        );
    }
}

export default Header;