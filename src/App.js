import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import LandingPage from './components/LandingPage';
import TextField from '@material-ui/core/TextField';
import FormDialog from './components/reusable/FormDialog';
import { SnackbarProvider, useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Web3 from 'web3';
import axios from 'axios';
import Biconomy from "@biconomy/mexa";

import LoadingOverlay from 'react-loading-overlay';
import openSocket from 'socket.io-client';
const notistackRef = React.createRef();
const {getTimeInSeconds, trim} = require("./utils");

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

let appRoot = require('app-root-path');
const {config, LS_KEY} = require(`${appRoot}/config`);
const {LAUNCH, PREPARE, WAITING, START, RESULT} = config.state;

let wallet = require("./components/wallet/portis").default;
const biconomy = new Biconomy(wallet.getProvider(), {
    dappId: config.biconomyDappId,
    apiKey: config.biconomyAPIKey,
    loginMessageToSign: config.loginMessageToSign,
    messageToSign: config.betSignMessage,
    strictMode: true
  });

const web3 = new Web3(biconomy);

let socket;
let smartContract;

let stateValue;

function App(props) {

  const { enqueueSnackbar } = useSnackbar();
  const [currentState, changeState] = useState(LAUNCH);
  const [userLogin, setUserLogin] = useState(false);
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
  const [openGameRulesDialog, setGameRulesDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [userInfo, setUserInfo] = useState({balanceInWei: 0, balanceInEther: 0, balanceInUSDT: 0});
  const [userAddress, setUserAddress] = useState("");
  const [userContract, setUserContract] = useState("");
  const [updateUserMessage, setUpdateUserMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [lastPrice, setLastPrice] = useState(0);
  const [stakePrice, setStakePrice] = useState(0);
  const [gamePaused, setGamePaused] = useState(false);
  const [winners, setWinners] = useState([
  ]);
  const [loosers, setLoosers] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [resultBetValue, setResultBetValue] = useState(0);
  const [resultPrice, setResultPrice] = useState(0);
  const [betPlaced, setBetPlaced] = useState({betCurrency: config.betCurrency});
  const [betUpList, setBetUpList] = useState([
  ]);
  const [betDownList, setBetDownList] = useState([
  ]);
  const setOverlayActive = props.setOverlayActive;
  const setOverlayMessage = props.setOverlayMessage;
  let withdrawInterval;

  // Similar to componentDidMount and componentDidUpdate. Pass empty array as second argument,
  // to stop this effect from running each time any state or props changes
  useEffect(() => {
    setOverlayActive(true);
    setOverlayMessage("Initializing the game ...");
    biconomy.on(biconomy.READY, async () => {
      // Initialize your dapp here
      if(biconomy.isLogin) {
        setUserLogin(true);
        setUsername(localStorage.getItem(LS_KEY.USERNAME));
        setUserContract(await biconomy.getUserContract(localStorage.getItem(LS_KEY.USER_ADDRESS)));
        setUserAddress(await biconomy.getUserAccount());
      } else {
        setOverlayActive(false);
        clearUserLoginData();
      }
    }).on(biconomy.ERROR, (error, message) => {
      console.log(error);
      setOverlayActive(false);
      // Handle error while initializing mexa
      showSnack(`Error while initializing Biconomy`, {variant: 'error'});
    });

    biconomy.on(biconomy.LOGIN_CONFIRMATION, (log, userContract) => {
      // User's Contract Wallet creation successful
      let userAddress = localStorage.getItem(LS_KEY.USER_ADDRESS);
      showSnack("On-chain identity created", {variant: 'success'});
      setUserContract(userContract);
      updateUserContract(userAddress, userContract);
    });
  }, []);

  useEffect(()=>{
    if(userContract && userContract !== "") {
      initUserInfo();
    }
  }, [userContract]);

  useEffect(()=>{
    getSmartContract();
    console.log( `current state is now ${currentState}`);
    stateValue = currentState;
    if(currentState !== LAUNCH) {
      startSocketConnection();
      if(currentState === RESULT) {
        initUserInfo();
      }
    } else {
      if(socket) {
        socket = socket.close();
      }
    }
  },[currentState]);

  const startSocketConnection = () => {
    if(!socket || !socket.connected) {
      socket = openSocket(config.socketConnectionURL);
    }

    if(socket) {
      socket.removeAllListeners();
      console.log("setting socket listener");

      socket.on("stateChange", (data)=>{
        console.log(data);
        if(data && data.state) {
          if(data.state === START && data.stakePrice) {
            setStakePrice(data.stakePrice);
          }
          if(data.state === PREPARE) {
            setGamePaused(false);
            setBetUpList([]);
            setBetDownList([]);
            setWinners([]);
            setLoosers([]);
            setResultBetValue(0);
            setIsWinner(false);
            setResultPrice(0);
            setBetPlaced({betCurrency: config.betCurrency});
          } else if(data.state === RESULT) {
            console.log(`result data :`);
            console.log(data);
            let game = data.game;
            let {loosers, resultBetValue, resultPrice} = game;
            let winnersInfo = data.winnersInfo;
            setWinners(winnersInfo);
            setResultPrice(resultPrice);
            setLoosers(loosers);
            setResultBetValue(resultBetValue);
            console.log("bet placed");
            console.log(betPlaced);
            console.log(game);
            if(betPlaced && betPlaced.betValue) {
              if(betPlaced.betValue === resultBetValue.toString()) {
                setIsWinner(true);
              }
            }
          }
          if(data.counter) {
            console.log(`Counter is now starting from ${data.counter} sec`)
            setCounter(data.counter);
          }
          console.log(currentState);
          if(currentState !== LAUNCH) {
            changeState(data.state);
          }
        }
      })

      socket.on("stakePrice", (data) => {
        console.log(`Stake price from server ${JSON.stringify(data)}`);
        if(data && data.stakePrice) {
          setStakePrice(data.stakePrice);
        }
      });

      socket.on("price", (data)=> {
        console.log(`Last price from server ${JSON.stringify(data)}`);
        if(data && data.lastPrice) {
          setLastPrice(data.lastPrice);
        }
      });

      socket.on("gamePaused", (data) => {
        showSnack(data.data, {variant: 'info', persist: true});
        setGamePaused(true);
        changeState(LAUNCH);
      });

      socket.on("error", (data)=> {
        console.log(data);
        showSnack(`Error while getting game data. Try refreshing the page.`, {variant: 'error'});
      });

      socket.on("betPlaced", (data) => {
        console.log(`Bet placed: ${JSON.stringify(data)}`);
        let {gameId, betAmount, betValue, userName, betAmountUSDT} = data;

        let betUserAddress = data.userAddress;
        if(betUserAddress.toLowerCase() === userContract.toLowerCase()) {
          console.log(`User placing bet with betValue ${betValue}`);
          console.log(`typeof betValue ${typeof betValue}`)
          let betPlaced = {};
          betPlaced.betAmountUSDT = betAmountUSDT;
          betPlaced.betValue = betValue;
          if(betValue === "1") {
            betPlaced.betValueString = "UP";
          } else if(betValue === "2") {
            betPlaced.betValueString = "DOWN";
          }
          setBetPlaced(betPlaced);
          initUserInfo();
        }

        if(betValue === "1") {
          betUpList.push({gameId, betUserAddress, betAmount, betValue, userName, betAmountUSDT});
          setBetUpList([...betUpList]);
        } else if(betValue === "2") {
          betDownList.push({gameId, betUserAddress, betAmount, betValue, userName, betAmountUSDT});
          setBetDownList([...betDownList]);
        }
        console.log(betUpList);
        console.log(betDownList);
      });

      requestCurrentPrice();
      requestStakePrice();
    }
  }


  const placeBet = async(betValue, betAmount) => {
    try {
      if(smartContract && betValue && betAmount) {

        if(userInfo.balanceInUSDT < betAmount) {
          showSnack("Not enough funds to place this bet. Please deposit funds in your wallet", {variant: "error"});
        } else {
          let betIndicator = betValue===1?"up":betValue===2?"down":"Invalid Bet Value";

          let maticUSDTPrice = await getPrice("MATICUSDT");
          console.log(`Bet Matic USDT price ${maticUSDTPrice}`);
          if(maticUSDTPrice > 0) {
            let maticAmount = betAmount/maticUSDTPrice;
            console.log(`Bet Matic bet Amount ${maticAmount}`);
            let amountInWei = web3.utils.toWei(`${maticAmount}`);
            console.log(`Bet Amount in wei ${amountInWei}`);
            console.log(`User Address is ${userAddress}`);
            let txOptions = {
              from: userAddress,
              value: amountInWei
            };

            smartContract.methods.placeTheBet(betValue, getTimeInSeconds()).estimateGas(txOptions)
            .then(function(gasAmount){
              txOptions.gas = gasAmount;
              console.log(`GAS AMOUNT FOR PLACING BET IS ${gasAmount}`)
              smartContract.methods.placeTheBet(betValue, getTimeInSeconds()).send(txOptions)
              .on('transactionHash', function(hash){
                console.log(`Bet placed with value ${betIndicator} and betAmount ${betAmount} with txHash ${hash}`);
                showSnack("Place bet transaction sent", {variant: 'info'});
              })
              .once('confirmation', function(confirmationNumber, receipt){
                if(receipt.status) {
                  showSnack("Successfully placed the bet", {variant: 'success'});
                } else {
                  if(stateValue !== START) {
                    showSnack("Betting phase is over. Try to place bet early in next game.", {variant: 'error'});
                  }
                }
                console.log(`Bet placed Confirmation.`);
                console.log(receipt);
              })
              .on('error', function(error, receipt) {
                console.error(error);
                console.log(stateValue);
                if(stateValue !== START) {
                  showSnack("Betting phase is over. Try to place bet early in next game.", {variant: 'error'});
                } else {
                  showSnack('Error while placing the bet.', {variant: 'error'});
                }
              });
            })
            .catch(function(error){
                console.error(error);
                showSnack(
                  'Could not place bet',
                  {variant: 'error'}
                );
            });
          } else {
            console.error(`Matic-USDT price should be greater than 0. Current value ${maticUSDTPrice}`);
          }
        }


      }
    } catch(error) {
      console.log(error);
      showSnack(`Error while pacing the bet`, {variant: 'error'});
    }
  }

  const getSmartContract = async () =>{
    let getSmartContractPath = `${config.baseURL}${config.getSmartContractPath}`;
    let response = await axios.get(getSmartContractPath).catch(function(error) {
        console.log(error);
        showSnack(`Error while getting game data (Smart Contracts)`, {variant: 'error'});
    });
    if(response && response.data) {
        let abi = response.data.abi;
        let address = response.data.address;
        smartContract = new web3.eth.Contract(abi, address);
        console.log(`Smart Contract initialized`);
    } else {
        console.error("Failed to initialize Game Smart Contract");
        showSnack(`Failed to load game data. Check console for details.`, {variant: 'error'});
    }
  }

  const promptForUserName = async () => {
    setOpenNameDialog(true);
  }

  const promptForWithdraw = async () =>{
    setOpenWithdrawDialog(true);
  }

  const promptForGameRules = async () =>{
    setGameRulesDialog(true);
  }

  const requestCurrentPrice = () => {
    console.log('Requesting current price from server via socket connection')
    if(socket) {
      console.log('Socket is open')
      socket.emit("getPrice", {symbol: config.symbol});
    } else {
      console.log('Socket is not open')
    }
  }

  const requestStakePrice = ()=>{
    console.log('Requesting stake price from server via socket connection')
    if(socket) {
      console.log('Socket is open')
      socket.emit("getStakePrice", {});
    } else {
      console.log('Socket is not open')
    }
  }

  const getUserNonce = async (address)=>{
      let getNoncePath = `${config.baseURL}${config.getNoncePath}`;

      let response = await axios.get(getNoncePath, {params: {address: address}})
      .catch(function(error) {
        setOverlayActive(false);
        console.log(error);
        showSnack(`Error while fetching user tracking id`, {variant: 'error'});
      });

      setOverlayActive(false);
      if(response && response.status !== 200) {
        showSnack(`Unable to fetch user tracking id. Please tell us about it on support@biconomy.io.`, {variant: 'error'});
      } else if(response){
        const data = response.data;
        console.log(data);
        if(data.code === 200 || data.code === 404) {
          return data.nonce;
        }
      }
      return;
  }

  const login = async (userAddress)=>{
    let userLoginPath = `${config.baseURL}${config.loginPath}`;
    try {
      const messageToSign = await biconomy.getLoginMessageToSign(userAddress);
      setOverlayMessage(`Getting your signature ..`);
      const signedMessage = await web3.eth.personal.sign(
        messageToSign,
        userAddress
      );

      if(signedMessage) {
        console.log(signedMessage);
        let payload = {};
        payload.walletId = wallet.getWalletId();
        payload.publicAddress = userAddress;
        payload.signature =  signedMessage;
        payload.message = config.loginMessageToSign;
        payload.signer = userAddress;
        axios
        .post(userLoginPath, payload)
        .then(function(response) {
          setOverlayActive(false);
          if(response && response.status !== 200) {
            showSnack(`Login failed. Please tell us about it on support@biconomy.io.`, {variant: 'error'});
          } else {
            const data = response.data;
            console.log(data);
            if(data.code === 200) {
              localStorage.setItem(LS_KEY.LOGGED_IN, true);
              localStorage.setItem(LS_KEY.USER_ADDRESS, userAddress);
              if(data.name) {
                localStorage.setItem(LS_KEY.USERNAME, data.name);
                setUsername(data.name);
              }
              setUserAddress(userAddress);
              setUserLogin(true);
              if(data.existingUser) {
                showSnack(`Login successfull`, {variant: 'success'});
              } else {
                showSnack(`Registration successfull`, {variant: 'success'});
                promptForUserName();
              }

              biconomy.accountLogin(userAddress, signedMessage, (error, response)=>{
                if(error) {
                  showSnack("Error while login to Biconomy", {variant: "error"});
                  return;
                }

                if(response.transactionHash) {
                  // First time user. Contract wallet transaction pending.
                  showSnack("Creating your identity on chain. Please wait", {variant: "info"});
                } else if(response.userContract) {
                  console.log(response);
                  // Existing user login successful
                  setUserContract(response.userContract);
                  if(!data.userContract) {
                    updateUserContract(userAddress, response.userContract);
                  }
                }
              });
            }
          }
        })
        .catch(function(error) {
          setOverlayActive(false);
          console.log(error);
          showSnack(`Error during login ${error.message}`, {variant: 'error'});
        });
      } else {
        setOverlayActive(false);
        showSnack(`Could not get user signature`, {variant: 'error'});
      }
    } catch(error) {
      console.log(error);
      setOverlayActive(false);
      showSnack(`Could not get user signature`, {variant: 'error'});
    }
  }

  const initUserInfo = async ()=>{
    try {
      console.log("Getting user info now");
      // Get user balance
      if(userContract) {
        setOverlayMessage("Getting your balance ...");
        let balanceInWei = await web3.eth.getBalance(userContract);
        let balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
        let maticUSDTPrice = await getPrice(config.symbol);
        let userInfo = {};
        try {
          let balanceInUSDT = parseFloat(maticUSDTPrice) * parseFloat(balanceInEther);
          userInfo.balanceInUSDT = trim(balanceInUSDT,5);
        } catch(error) {
          console.log(error);
          console.log("Error while converting matic balance to USDT");
          showSnack("Error while converting matic balance to USDT", {variant: "error"});
        }
        userInfo.balanceInWei = balanceInWei;
        userInfo.balanceInEther = balanceInEther;
        userInfo.userAddress = userContract;

        setUserInfo(userInfo);
        setOverlayActive(false);
        console.log(userInfo);
      } else {
        if(userLogin) {
          showSnack(`Unable to get user address. Please reload the page.`, {variant: "error"});
        }
      }
    } catch(error) {
      console.log(error);
      setOverlayActive(false);
      showSnack(`Error while getting user balance`, {variant: "error"});
    }
  }

  const updateUser = (publicAddress, username) => {
    if(!username || username.trim() === "") {
      setUpdateUserMessage("Please enter username");
      return;
    }
    let userUpdatePath = `${config.baseURL}${config.updatePath}`;
    let payload = {};
    payload.publicAddress = publicAddress;
    payload.username = username;
    axios
    .put(userUpdatePath, payload)
    .then(function(response) {
      if(response && response.status !== 200) {
        setUpdateUserMessage(`Failed to update username. Please tell us about it on support@biconomy.io.`);
      } else {
        const data = response.data;
        if(data.code === 200) {
          setUpdateUserMessage("");
          showSnack(`Username updated`, {variant: 'success'});
          setOpenNameDialog(false);
          localStorage.setItem(LS_KEY.USERNAME, username);
        } else {
          setUpdateUserMessage(data.message);
        }
      }
    })
    .catch(function(error) {
      setOverlayActive(false);
      console.log(error.response);
      if(error.response && error.response.data && error.response.data.message) {
        setUpdateUserMessage(error.response.data.message);
      } else {
        showSnack(`Error during username update ${error.message}`, {variant: 'error'});
      }
    });
  };

  const updateUserContract = (publicAddress, userContract) => {
    if(!userContract || userContract.trim() === "") {
      showSnack(`Unable to update user identity. Please tell us about it on support@biconomy.io`,{variant: "error"});
      return;
    }
    let updatePath = `${config.baseURL}${config.updatePath}`;
    let payload = {};
    payload.publicAddress = publicAddress;
    payload.userContract = userContract;
    axios
    .put(updatePath, payload)
    .then(function(response) {
      if(response && response.status !== 200) {
        showSnack(`Failed to update user identity. Please tell us about it on support@biconomy.io.`,{variant: "error"});
      } else {
        const data = response.data;
        if(data.code === 200) {
          if(data.airdrop) {
            showSnack(`${web3.utils.fromWei(data.airdropAmount)} matic tokens are being transfered to your wallet.`,
            {variant: "success", persist: true});
            showSnack(`Reload your wallet balance in few seconds and start playing.`,
            {variant: "success", persist: true});
            initUserInfo();
          }
          showSnack(`User identity updated.`, {variant: "success"});
        } else {
          showSnack(data.message, {variant: "error"});
        }
      }
    })
    .catch(function(error) {
      setOverlayActive(false);
      console.log(error.response);
      showSnack(`Error during user identity update ${error.message}`, {variant: 'error'});
    });
  };

  const onLogin = async () => {
    setOverlayActive(true);
    setOverlayMessage("Connecting with your wallet ...");
    try {
      await wallet.init();
      web3.eth.getAccounts((error, accounts) => {
        if(error) {
          console.log(error);
          setOverlayActive(false);
          showSnack(`Error while fetching account from your wallet`, {variant: 'error'});
        } else {
          if(accounts && accounts.length > 0) {
            let userAddress = accounts[0];
            setOverlayMessage(`Getting your account ..`);
            login(userAddress);
          } else {
            setOverlayActive(false);
            showSnack(`Error while fetching your account`, {variant: 'error'});
          }
        }
      });
    } catch(error) {
      setOverlayActive(false);
      showSnack(`Error while getting your public address. Make sure your wallet is unlocked.`, {variant: 'error'});
    }
  }

  const onLogout = ()=>{
    clearUserLoginData();
    if(biconomy) {
      biconomy.logout();
    }
  }

  const clearUserLoginData = ()=> {
    setUserLogin(false);
    setUsername("");
    setUserAddress("");
    localStorage.removeItem(LS_KEY.LOGGED_IN);
    localStorage.removeItem(LS_KEY.USER_ADDRESS);
    localStorage.removeItem(LS_KEY.USERNAME);
  }

  const showSnack = (content, options) => {
    enqueueSnackbar(content, options);
  }

  const handleDialogClose = ()=>{
    setOpenNameDialog(false);
    setUpdateUserMessage("");
    setOpenWithdrawDialog(false);
    setGameRulesDialog(false);
  }

  const handleDialogAction = ()=>{
    updateUser(userAddress, username);
  }

  const getWithdrawTransactionReceipt = async (txHash) => {
    var receipt = await web3.eth.getTransactionReceipt(txHash);

    if(receipt){
      if(receipt.status){
        showSnack(`Withdraw successful`, {variant: 'success'});
        initUserInfo();
      }
      else if(!receipt.status){
        showSnack(`Withdraw failed. Please contact support@biconomy.io with given info : {txhash : ${txHash}}`, {variant: 'error'});
      }
      if(withdrawInterval){
        clearInterval(withdrawInterval);
      }
    }
  }

  const getBalance = () => {
    let balance = 0;
    if(userInfo.balanceInEther) {
      balance = Math.round(userInfo.balanceInEther * 100) / 100
    }
    return balance;
  }

  const handleGameRulesDialogAction = async ()=>{
    setGameRulesDialog(false);
    changeState(PREPARE);
  }

  const handleWithdrawDialogAction = async ()=>{
    try{
      let isAddress = web3.utils.isAddress(receiverAddress);
      if(!isAddress){
        console.log("Invalid Address");
        showSnack(`Invalid Address`, {variant: 'error'});
        return;
      }
      if(withdrawAmount<=getBalance()){
        if(biconomy){
          let result = await biconomy.withdrawFunds(receiverAddress,withdrawAmount*1e18);
          console.log(result);

          if(result && result.txHash){
            showSnack(`Transaction sent to blockchain`, {variant: 'info'});
            withdrawInterval = setInterval(function(){
              getWithdrawTransactionReceipt(result.txHash)
            }, 2000);
          }
          else{
            showSnack(result.log, {variant: 'error'});
          }
          setOpenWithdrawDialog(false);
        }else{
          console.log("Biconomy is not Defined");
          showSnack(`Game is not initialized Properly`, {variant: 'error'});
        }
      }else{
        console.log("Insufficient Funds");
        showSnack(`Insufficient funds`, {variant: 'error'});
      }
    }catch(error){
      console.log(error);
      if(typeof error==="string"){
        showSnack(error, {variant: 'error'});
      }
      else{
        showSnack("Error while withdrawing Funds", {variant: 'error'});
      }
    }
  }

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const onReceiverAddressChange = (event) => {
    setReceiverAddress(event.target.value);
  }

  const onWithdrawAmountChange = (event) => {
    setWithdrawAmount(event.target.value);
  }

  const getPrice = async (symbol) => {
    let getPricePath = `${config.baseURL}${config.getPricePath}`;

    let response = await axios.get(getPricePath, {params: {symbol}})
    .catch(function(error) {
      console.log(error);
      showSnack(`Error while fetching MATIC price`, {variant: 'error'});
    });

    if(response && response.status !== 200) {
      showSnack(`Unable to fetch MATIC price. Please tell us about it on support@biconomy.io.`, {variant: 'error'});
    } else if(response){
      const data = response.data;
      console.log(data);
      if(data.lastPrice) {
        return data.lastPrice;
      }
    }
    return;
  }

  const nameDialogContent = <div id="username-form">
    <TextField autoFocus margin="dense"
      id="username-input" label="Name" type="text" fullWidth onChange={onUsernameChange}/>
      <div className={`dialog-error-message ${!updateUserMessage?"hidden":""}`}>{updateUserMessage}</div>
    </div>

  const gameRulesDialogContent = <div id="username-form">
    <div className="topRow">Go through the game rules and start playing!!!</div>
    <ul>
      <li>
        <div className="middleRow">
          The maximum amount you can bet in a single game is 1000 matic tokens.
          However, there is no limit on the number of games that can be played.
        </div>
      </li>
      <li>
        <div className="middleRow">In case there are no winners in a game, the entire pot of the money lost will go to the Reserve Pool.</div>
        <div className="middleRow">Reserve Pool is the pool of funds that is used to distribute winning amount to users when every player wins the game as there is no loosing money in that game.</div>
      </li>
      <li>
        <div className="middleRow">In case everyone wins the game, the money will be distributed from the reserve pool to the winners.
        In this case, each winning user will get back their bet amount + 10% of his bet amount upto 100 matic tokens from the Reserve Pool.</div>
        <div className="middleRow">For example, Alice and Bob both placed a bet of 10 Matic Tokens that price will go up and both wins the game, then both players will get 10 + 1 = 11 Matic Tokens each.</div>
      </li>
      <li>
        <div  className="middleRow">User can withdraw their tokens any time during the course of game without paying any transaction fee.</div>
      </li>
    </ul>
    <div className="lastRowDisclaimer">
      <span>Disclaimer </span>: Moonshot is a peer to peer trading platform where we don’t hold any of your private keys.
      Biconomy won’t be liable any money lost or hacked.
    </div>
  </div>

  const withdrawDialogContent = <div id="username-form">
    <div id="current-balance-container">
      <div id="current-balance-label">Current Balance</div>
      <div id="current-balance" className="user-balance-matic"> {getBalance()} MATIC</div>
    </div>
    <TextField autoFocus margin="dense"
      id="receiver-address" label="Reciever Wallet Address" type="text" fullWidth onChange={onReceiverAddressChange} />
      <TextField autoFocus margin="dense"
      id="withdraw-amount" label="Amount(in Matic)" type="number" fullWidth  onChange={onWithdrawAmountChange}/>
    </div>

  return (
      <div className="App" id="Home">
        <img src="/images/moon.png" alt="moon" className="moon-image"/>

        <LandingPage currentState={currentState} changeState={changeState} onLogin={onLogin}
          userLogin={userLogin} username={username} promptForUsername={promptForUserName} onLogout={onLogout}
          wallet={wallet} userInfo={userInfo} getPrice={getPrice} setOverlayActive={props.setOverlayActive}
          setOverlayMessage={props.setOverlayMessage} showSnack={showSnack} counter={counter}
          requestCurrentPrice={requestCurrentPrice} lastPrice={lastPrice} lastPriceUnit={config.lastPriceUnit}
          stakePrice={stakePrice} requestStakePrice={requestStakePrice} userAddress={userAddress}
          placeBet={placeBet} betUpList={betUpList} betDownList={betDownList} winners={winners}
          loosers={loosers} resultBetValue={resultBetValue} betPlaced={betPlaced} isWinner={isWinner}
          resultPrice={resultPrice} userContract={userContract} promptForWithdraw={promptForWithdraw}
          promptForGameRules={promptForGameRules} initUserInfo={initUserInfo}/>

        <FormDialog open={openNameDialog} title="One last thing" contentText="What should we call you?"
          handleClose={handleDialogClose} handleCancel={handleDialogClose} handleAction={handleDialogAction}
          children={nameDialogContent} cancelText="Skip"/>

        <FormDialog open={openWithdrawDialog} title="Withdraw Funds"
          handleClose={handleDialogClose} handleCancel={handleDialogClose} handleAction={handleWithdrawDialogAction}
          children={withdrawDialogContent} cancelText="Cancel" />

        <FormDialog open={openGameRulesDialog} title="Game Rules"
          handleClose={handleDialogClose} handleCancel={handleDialogClose} handleAction={handleGameRulesDialogAction}
          children={gameRulesDialogContent} cancelText="Cancel" actionText="Skip and Play"/>

      </div>
  );
}

export default function AppWithSnacks() {
  const classes = useStyles();
  const [overlayActive, setOverlayActive] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("Loading your content ...");
  const handleClose = key => () => {
      notistackRef.current.closeSnackbar(key);
  }

  return (
    <LoadingOverlay
      active={overlayActive}
      spinner
      className = "overlay-container"
      classNamePrefix="gtp-overlay-"
      text={overlayMessage}>
      <SnackbarProvider ref={notistackRef} maxSnack={3} preventDuplicate
        anchorOrigin={{vertical: 'top',horizontal: 'center',}}
        action={(key) => (
          <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose(key)}
            >
              <CloseIcon />
            </IconButton>
      )}>
        <App setOverlayActive={setOverlayActive} setOverlayMessage={setOverlayMessage}/>
      </SnackbarProvider>
    </LoadingOverlay>
  )
}

export {web3}