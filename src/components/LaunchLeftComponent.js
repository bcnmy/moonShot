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
                    /**Page Heading */
                    </div>
                </div>
                <div className="description-content">
                    <div id="content">
                    /**Page Content */ /**Page Content */  /**Page Content */ /**Page Content */
                    /**Page Content */ /**Page Content */ /**Page Content */ /**Page Content */
                    /**Page Content */ /**Page Content */ /**Page Content */ /**Page Content */

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