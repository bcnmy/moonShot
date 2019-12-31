import React, { Component } from 'react';
import { Button } from '@material-ui/core';
const {config} = require("./../config");
const {PREPARE} = config.state;

class LaunchLeftComponent extends Component{

    constructor(props) {
       super(props);
       this.changeComponent = props.changeComponent;
       this.showGame = this.showGame.bind(this);
    }

    showGame() {
        this.changeComponent(PREPARE);
    }

    render() {
        return(
            <section>
                <div className="description-heading">
                    <div id="heading">
                    Learn. Trade. Win.
                    </div>
                </div>
                <div className="description-content">
                    <div id="content">
                    Learn to trade in one minute.  Moonshot is on a mission to spread 
                    awareness about trading in the most simplest and fun way possible. 
                    With moonshot anyone can become a trading champ with in a minute.

                    </div>
                </div>
                <div className="launch-button">
                <Button onClick={this.showGame} target="_blank" variant="contained" className="play-button" id="start-playing">
                    Start Playing
                </Button>
                </div>
            </section>
        );
    }
}

export default LaunchLeftComponent;