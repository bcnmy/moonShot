import React, { useState, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
const {config,LS_KEY} = require("../config");

export default function UserInfoPopover(props) {

  const [logout, setLogout] = useState(false);

  useEffect(() => {
    setLogout(false);
  }, []);

  const onLogout = ()=>{
    setLogout(true);
    props.handleClose();
  }

  const refreshBalance = ()=> {
    props.initUserInfo();
    props.showSnack("Refreshing your balance", {variant: "info", autoHideDuration: 2000});
  }

  const openWallet = async ()=>{
    if(props.wallet && props.wallet.isWalletOpenSupported) {
      props.showSnack("Opening your wallet", {variant: "info", autoHideDuration: 2000});
      props.handleClose();
      await props.wallet.openWallet();
    }
  }

  const onExited = ()=> {
    if(logout) {
      props.onLogout();
    }
  }

  const onEnter = async ()=> {
    setLogout(false);
  }

  const getBalance = () => {
    let balance = 0;
    if(props.userInfo.balanceInEther) {
      balance = Math.round(props.userInfo.balanceInEther * 100) / 100
    }
    return balance;
  }

  return (
      <Popover
        id="user-info-popover"
        open={props.open}
        className="user-info-popover"
        anchorEl={props.anchorEl}
        onExited={onExited}
        onEnter={onEnter}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
          <div className="user-info-row flex user-info-name-row">
              {!props.username &&
                <div className="username-missing">
                    <div>You have not set your username</div>
                    <Button variant="contained" size="small" onClick={props.promptForUsername}>Set</Button>
                </div>
              }
          </div>
          {props.wallet && props.wallet.isWalletOpenSupported && (
            <div className="user-info-row show-wallet-row">
                <Button startIcon={<OpenInNewIcon />} onClick={openWallet}>Open Wallet</Button>
            </div>
          )}

          <div className="user-info-row balance-row">
              <div id="user-balance-container">
                <label id="user-balance-amount">{getBalance()}</label>
                <label id="user-balance-unit">MATIC</label>
                <label className="refresh-balance-button" onClick={refreshBalance}><RefreshIcon /></label>
              </div>
              <div id="user-balance-usd">
                {`${props.userInfo.balanceInUSDT} USDT`}
              </div>
              <div className="user-info-row show-withdraw-button">
                <Button variant="contained" color="primary" startIcon={<MonetizationOnIcon />} onClick={props.promptForWithdraw}>Withdraw Funds</Button>
              </div>
              <div className="user-info-row show-withdraw-button">
                <Button variant="contained" color="primary" startIcon={<MonetizationOnIcon />} onClick={props.promptForDeposit}>Deposit Funds</Button>
              </div>
          </div>
          
          { config.env === "test" && <div className="user-info-row faucet-row">
            <Tooltip title="Select 'Matic ETH' token and 'Testnet2' network on faucet " placement="bottom" arrow>
              <Button href="https://faucet.matic.network/" target="_blank" color="primary" variant="contained">Get tokens from faucet</Button>
            </Tooltip>
            <div className="mobile faucet-note">Select 'Matic ETH' token and 'Testnet2' network on faucet </div>
          </div> }
          {/* <div className="user-info-row deposit-withdraw-row">
            <Button variant="contained">Deposit</Button>
            <Button variant="contained">Withdraw</Button>
          </div> */}
          <div className="user-info-row logout-row">
            <Button startIcon={<PowerSettingsNewIcon />} onClick={onLogout}>Logout</Button>
          </div>
      </Popover>
  );
}
