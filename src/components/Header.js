import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Chip from '@material-ui/core/Chip';
import UserInfoPopover from './UserInfoPopover';
const loginSectionRef = React.createRef();

export default function Header(props) {

    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const displayHome = () => {
        props.changeState("launch");
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
            <div className="gameName">
                <div className="game-shortform" onClick={displayHome}> 
                    <img className="logo" src="/images/moonShot.png" alt="Biconomy logo white" /> 
                    {/* <div className="logo">MoonShot</div> */}
                </div>
                <div className="game-fullform">  </div>
            </div>
            <div className="login-section" ref={loginSectionRef}>
                <Button id="login-button" className={`gtp-buttons ${props.userLogin ? "hidden":""}`} variant="contained"
                    onClick={props.onLogin}>
                    Login
                </Button>
                <div id="logged-in-user-info" className={props.userLogin ? "user-info-container":"hidden"}>
                    <Chip label={`${props.userInfo.balanceInUSDT} USDT`} className="user-chips"/>
                    <Chip icon={<EmojiEmotionsIcon />} id="username-chip"
                        className="user-chips"
                        label={props.username?props.username:"Anonymous"}
                        onDelete={handleAccountClick}
                        deleteIcon = {< KeyboardArrowDownIcon />}/>
                    <UserInfoPopover open={openUserInfo} anchorEl={anchorEl} handleClose={handleCloseUserInfo}
                    username={props.username} promptForUsername={props.promptForUsername} onLogout={props.onLogout}
                    wallet={props.wallet} userInfo={props.userInfo} getPrice={props.getPrice} setOverlayActive={props.setOverlayActive}
                    setOverlayMessage={props.setOverlayMessage} showSnack={props.showSnack}/>
                </div>
            </div>
        </section>
    );
}