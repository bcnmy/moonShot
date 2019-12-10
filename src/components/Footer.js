import React, { Component } from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

class Footer extends Component{

    render() {
        return(
            <div className="footer">
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
            </div>
        );
    }
}

export default Footer;