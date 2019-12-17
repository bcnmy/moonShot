import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class LaunchLeftComponent extends Component{

    constructor(props) {
       super(props);
       this.changeComponent = props.changeComponent;
       this.showGame = this.showGame.bind(this);
    }

    showGame() {
        this.changeComponent("waiting");
    }

    render() {
        return(
            <section>
                <div className="description-heading">
                    <div id="heading">
                    Short Term Options Trading, Gamified
                    </div>
                </div>
                <div className="description-content">
                    <div id="content">
                    YOLOrekt is a new take on short term options trading. Through gamification,
                    YOLOrekt is any traders new best friend. Each game lasts three minutes and is
                    broken into three phases. Click below to begin playing!
                    </div>
                </div>
                <div className="launch-button">
                <Button onClick={this.showGame} target="_blank" variant="contained" className="play-button" id="start-playing">
                    Start Rolling
                </Button>
                </div>
            </section>
        );
    }
}

export default LaunchLeftComponent;