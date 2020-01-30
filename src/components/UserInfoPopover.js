import React, { useState, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';

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

  const onCopyAddress = () => {
    props.showSnack("Address copied to clipboard", {variant: "info", autoHideDuration: 2000});
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
                <label className="refresh-balance-button" onClick={refreshBalance}><RefreshIcon /></label>
              </div>
              <div id="user-balance-usd">
                {`${props.userInfo.balanceInUSDT} USDT`}
              </div>
              <div className="user-info-row show-withdraw-button">
                <Button variant="contained" color="primary" startIcon={<MonetizationOnIcon />} onClick={props.promptForWithdraw}>Withdraw Funds</Button>
              </div>
          </div>
          <div className="user-info-row deposit-row">
            <div className="user-info-deposit-label">Deposit funds to below address</div>

            <div className="user-info-deposit-address">
              <span>{props.userInfo.userAddress}</span>
              <CopyToClipboard text={props.userInfo.userAddress} onCopy={onCopyAddress}>
                <svg className="copy-contract-address" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              </CopyToClipboard>
            </div>

            <div className="user-info-deposit-info">
              <div className="tooltipLabel">Why this address is different than my portis address?
                <div className="tooltiptext">
                  This address is your wallet address on blockchain whose owner is your portis account address.<br/>
                  Funds can be withdrawn only with your permission from this wallet.<br/><br/>This on-chain wallet allows
                  us to do gasless transactions for you so you do not have to pay the gas fees for your transactions.
                </div>
              </div>
            </div>
          </div>
          <div className="user-info-row faucet-row">
            <Tooltip title="Select 'Matic ETH' token and 'Testnet2' network on faucet " placement="bottom" arrow leaveDelay="10000">
              <Button href="https://faucet.matic.network/" target="_blank" color="primary" variant="contained">Get tokens from faucet</Button>
            </Tooltip>
            <div className="mobile faucet-note">Select 'Matic ETH' token and 'Testnet2' network on faucet </div>
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
