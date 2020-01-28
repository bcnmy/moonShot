import React, { useState, Component } from 'react';
import { Button } from '@material-ui/core';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Chip from '@material-ui/core/Chip';
import UserInfoPopover from './UserInfoPopover';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
const loginSectionRef = React.createRef();
const {config} = require("./../config");
const {LAUNCH} = config.state;

class SubMenuComponent extends Component{
    render() {
        return (
            <div className="subMenuComponent">
                <div className="feedback">
                    <div className="feedback-link" onClick={this.props.displayHome}>
                        <a href="https://support-biconomy.typeform.com/to/wPmUpr" target="_">Feedback</a>
                    </div>
                </div>
                <div className="game-rules">
                    <a className="game-Rules-display" onClick={this.props.promptForGameRules}>Game Rules</a>
                </div>
            </div>
        );
    }
}

export default function Header(props) {

    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const displayHome = () => {
        props.changeState(LAUNCH);
    }

    const handleAccountClick = (event) => {
        setAnchorEl(loginSectionRef.current);
        setOpenUserInfo(true);
    }

    const handleCloseUserInfo = ()=>{
        setOpenUserInfo(false);
        setAnchorEl(null);
    }

    return(
        <section className = "menu-bar" id="top">
            <div className="main-menu">
                <div className="gameName">
                    <div className="game-shortform" onClick={displayHome}>
                        <img className="logo" src="/images/moonshot.png" alt="Biconomy logo white" />
                        {/* <div className="logo">MoonShot</div> */}
                    </div>
                    <div className="game-fullform"> powered by Biconomy </div>
                </div>
                
                <div className="login-section" ref={loginSectionRef}>
                    <div className="sub-menu">
                        <div className="non-mobile">
                            <SubMenuComponent displayHome={displayHome} promptForGameRules={props.promptForGameRules}/>
                        </div>                    
                        <Button id="login-button" className={`gtp-buttons ${props.userLogin ? "hidden":""}`} variant="contained"
                            onClick={props.onLogin}>
                            Login
                        </Button>
                        <div id="logged-in-user-info" className={props.userLogin ? "user-info-container":"hidden"}>
                            <Chip label={`${props.userInfo.balanceInUSDT} USDT`} className="user-chips non-mobile"/>
                            <Chip icon={<EmojiEmotionsIcon />} id="username-chip"
                                className="user-chips"
                                label={props.username?props.username:"Anonymous"}
                                onDelete={handleAccountClick}
                                deleteIcon = {< KeyboardArrowDownIcon />}/>
                            <UserInfoPopover open={openUserInfo} anchorEl={anchorEl} handleClose={handleCloseUserInfo}
                            userContract={props.userContract}
                            username={props.username} promptForUsername={props.promptForUsername} onLogout={props.onLogout}
                            wallet={props.wallet} userInfo={props.userInfo} getPrice={props.getPrice} setOverlayActive={props.setOverlayActive}
                            setOverlayMessage={props.setOverlayMessage} showSnack={props.showSnack} promptForWithdraw={props.promptForWithdraw}/>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="mobile">
                <SubMenuComponent displayHome={displayHome} promptForGameRules={props.promptForGameRules}/>
            </div>
        </section>
    );
}