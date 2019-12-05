import React, { Component } from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Button } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';
import Modal from '@material-ui/core/Modal';

class PrepareGameLeftComponent extends Component{

    render(){
        return(
            <section className="prepare-page-left">
                <div className="prepare-page-heading">
                    <div id="prepare-heading">
                    Estimating Bet Price ..
                    </div>
                    <div id="prepare-timer">
                    0:19 seconds
                    </div>
                </div>
                <div className="prepare-page-content">
                    <div className="staking-price">
                    </div>
                </div>             
            </section>
        );
    }
}

export default PrepareGameLeftComponent;