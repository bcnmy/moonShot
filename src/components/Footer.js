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
                    <div>
                        <ul className="icons">
                            <li>
                                <a href="https://www.linkedin.com/company/biconomy" target="_"><LinkedInIcon className="social-icons" style={{ fontSize: 30,color: "grey" }}/></a>
                            </li>
                            <li>
                                <a href="https://twitter.com/biconomy" target="_"><TwitterIcon className="social-icons" style={{ fontSize: 30,color: "grey" }}/></a>
                            </li>
                            <li >
                                <a href="https://github.com/bcnmy/" target="_"><GitHubIcon className="social-icons" style={{ fontSize: 30,color: "grey" }}/></a>
                            </li>
                            <li >
                                <a href="https://t.me/biconomy" target="_"><TelegramIcon className="social-icons" style={{ fontSize: 30,color: "grey" }}/></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="disclaimer">
                All rights reserved. Biconomy© 2020.
                </div>
            </div>
        );
    }
}

export default Footer;