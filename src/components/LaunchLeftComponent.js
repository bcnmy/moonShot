import React, { Component } from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Button } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';

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

                <div className="social-media-icon">
                    <ul className="icons">
                        <li className="m1">
                            <a href="https://www.linkedin.com/company/biconomy" target="_"><LinkedInIcon className="social-icons"/></a>
                        </li>
                        <li className="m1">
                            <a href="https://twitter.com/biconomy" target="_"><TwitterIcon className="social-icons"/></a>
                        </li>
                        <li className="m1">
                            <a href="https://github.com/bcnmy/" target="_"><GitHubIcon className="social-icons"/></a>
                        </li>
                        <li className="m1 ">
                            <a href="https://t.me/biconomy" target="_"><TelegramIcon className="social-icons"/></a>
                        </li>
                    </ul>
                </div>  
                <div className="disclaimer">
                    All Rights Reserved by Biconomy© 2019
                </div>   
            </section>
        );
    }
}

export default LaunchLeftComponent;