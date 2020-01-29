import React, { useState, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

export default function UserInfoPopover(props) {

  const [logout, setLogout] = useState(false);

  useEffect(() => {
    setLogout(false);
  }, []);

  const onLogout = ()=>{
    setLogout(true);
    props.handleClose();
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
          {props.wallet.isWalletOpenSupported && (
            <div className="user-info-row show-wallet-row">
                <Button startIcon={<OpenInNewIcon />} onClick={openWallet}>Open Wallet</Button>
            </div>
          )}
         
          <div className="user-info-row balance-row">
                <div id="user-balance-container">
                  <label id="user-balance-amount">{getBalance()}</label>
                  <label id="user-balance-unit">MATIC</label>
                </div>
                <div id="user-balance-usd">
                  {`${props.userInfo.balanceInUSDT} USDT`}
                </div>
                <div className="user-info-row show-withdraw-button">
                  <Button startIcon={<OpenInNewIcon />} onClick={props.promptForWithdraw}>Withdraw</Button>
                </div>
                {/* <div id="user-balance-usd">
                  <Chip label="$ 56" color="primary"/>
                </div> */}
          </div>
          <div className="user-info-row">
            <div className="user-info-deposit-label">Deposit funds to below address</div>
            <div className="user-info-deposit-address">{props.userInfo.userAddress}</div>
            <div className="user-info-deposit-info">
              <div className="tooltipLabel">why this address is different than my portis address?
                <div className="tooltiptext">
                  This address is your wallet address on blockchain whose owner is your portis account address. 
                  Funds can be withdrawn only with your permission from this wallet. This on-chain wallet allows
                  us to do gasless transactions for you so you do not have to pay the gas fees for your transactions.
                </div>
              </div>
            </div>
          </div>
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
