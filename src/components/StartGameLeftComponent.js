import React, { Component } from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Button } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';
import Modal from '@material-ui/core/Modal';

class StartGameLeftComponent extends Component{

    render(){
        return(
            <section className="wait-page-left">
                <div className="wait-page-heading">
                    <div id="wait-heading">
                    Waiting Phase
                    </div>
                    <div id="timer">
                    0:19 seconds
                    </div>
                </div>
                <div className="wait-page-content">
                    <div id="wait-content">
                        Result Calculation in Progress ...
                    </div>

                    <div className="staking-price-value mb-4">
                        Current Stake Price  0.02967 matic/usdt
                    </div>
                    <div className="staking-price">
                    </div>
                </div>             
            </section>
        );
    }
}

export default StartGameLeftComponent;