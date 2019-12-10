import React, { Component } from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Button } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';
import Modal from '@material-ui/core/Modal';

class WaitLeftComponent extends Component{

    render(){
        return(
            <section className="wait-page-left">
                <div className="wait-page-heading">
                    <div id="wait-heading">
                    Waiting Phase
                        <div id="wait-content">
                            Result Calculation in Progress ...
                        </div>
                    </div>
                    <div id="timer">
                    0:19 seconds
                    </div>
                </div>
                <div className="wait-page-content">
                    

                    <div className="staking-price-value mb-4">
                        Current Stake Price  <br /> $ 0.02967
                    </div>
                    <div className="staking-price">
                    </div>
                </div>             
            </section>
        );
    }
}

export default WaitLeftComponent;