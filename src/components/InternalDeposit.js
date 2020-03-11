import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function InternalDeposit(props) {
    return (
        <div className="user-info-row deposit-row">
        <div className="user-info-deposit-label">Deposit funds to below address</div>

        <div className="user-info-deposit-address">
          <span>{props.userInfo.userAddress}</span>
          <CopyToClipboard text={props.userInfo.userAddress} onCopy={props.onCopyAddress}>
            <svg className="copy-contract-address" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
          </CopyToClipboard>
        </div>
        {localStorage.getItem(props.LS_KEY.WALLET_SELECTED)==="portis" && 
        <div className="user-info-deposit-info">
          <div className="tooltipLabel">Why is this address different to the address on portis Wallet?
            <div className="tooltiptext">
            This address is your Wallet Address and is the account from which you will be trading from, and sending/receiving Matic tokens to trade. <br/>
Do note the address that your Portis Wallet (after pressing Open Wallet) will display for its Ethereum and corresponding ERC 20 token addresses will be different to the Wallet Address displayed here.<br/>

              <br/><br/>This on-chain wallet allows us to help you facilitate gasless transactions for you so you do not have to pay the gas fees for your transactions.
<br/><br/>Remember, funds can be withdrawn only with your permission from this wallet.
            </div>
          </div>
        </div>
        }
      </div>
    );
}