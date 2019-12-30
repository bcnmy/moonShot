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
import LoadingOverlay from 'react-loading-overlay';
import openSocket from 'socket.io-client';
const notistackRef = React.createRef();
const {getTimeInSeconds} = require("./utils");

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

let appRoot = require('app-root-path');
const {config, LS_KEY} = require(`${appRoot}/config`);
const {LAUNCH, PREPARE, WAITING, START, RESULT} = config.state;

let wallet = require("./components/wallet/metamask").default;
console.log(wallet);
const web3 = new Web3(wallet.getProvider());
let socket;
let smartContract;

function App(props) {

  const { enqueueSnackbar } = useSnackbar();
  const [currentState, changeState] = useState(LAUNCH);
  const [userLogin, setUserLogin] = useState(false);
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState({balanceInWei: 0, balanceInEther: 0, balanceInUSDT: 0});
  const [userAddress, setUserAddress] = useState("");
  const [updateUserMessage, setUpdateUserMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [lastPrice, setLastPrice] = useState(0);
  const [stakePrice, setStakePrice] = useState(0);
  const [winners, setWinners] = useState([]);
  const [loosers, setLoosers] = useState([]);
  const [resultBetValue, setResultBetValue] = useState(0);
  const [betPlaced, setBetPlaced] = useState({betValue:0, betAmountUSDT: 0, betCurrency: config.betCurrency});
  const [betUpList, setBetUpList] = useState([
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'}
  ]);
  const [betDownList, setBetDownList] = useState([
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'},
    // {userName: 'sachint', betAmountUSDT: '0.017'}
  ]);
  const setOverlayActive = props.setOverlayActive;
  const setOverlayMessage = props.setOverlayMessage;

  // Similar to componentDidMount and componentDidUpdate. Pass empty array as second argument,
  // to stop this effect from running each time any state or props changes
  useEffect(() => {
    // setCounter(100);
    let isLoggedIn = localStorage.getItem(LS_KEY.LOGGED_IN);
    if(isLoggedIn) {
      setUserLogin(true);
      setUserAddress(localStorage.getItem(LS_KEY.USER_ADDRESS));
      setUsername(localStorage.getItem(LS_KEY.USERNAME));
      initUserInfo();
    } else {
      clearUserLoginData();
    }
  }, []);


  useEffect(()=>{
    getSmartContract();
    console.log( `current state is now ${currentState}`);
    if(currentState !== LAUNCH) {
      startSocketConnection();
    }
  },[currentState]);

  const startSocketConnection = () => {
    if(!socket) {
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
            setBetUpList([]);
            setBetDownList([]);
            setWinners([]);
            setLoosers([]);
            setResultBetValue(0);
            setBetPlaced({betCurrency: config.betCurrency});
          } else if(data.state === RESULT) {
            let game = data.game;
            let {winners, loosers, resultBetValue} = game;
            setWinners(winners);
            setLoosers(loosers);
            setResultBetValue(resultBetValue);
          }
          if(data.counter) {
            console.log(`Counter is now starting from ${data.counter} sec`)
            setCounter(data.counter);
          }
          changeState(data.state);
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

      socket.on("error", (data)=> {
        console.log(data);
        showSnack(`Error while getting game data. Try refreshing the page.`, {variant: 'error'});
      });

      socket.on("betPlaced", (data) => {
        console.log(`Bet placed: ${JSON.stringify(data)}`);
        let {gameId, betAmount, betValue, userName, betAmountUSDT} = data;

        let betUserAddress = data.userAddress;
        if(betUserAddress.toLowerCase() === userAddress.toLowerCase()) {
          betPlaced.betAmountUSDT = betAmountUSDT;
          betPlaced.betValue = betValue;
          setBetPlaced(...betPlaced);
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
        let betIndicator = betValue===1?"up":betValue===2?"down":"Invalid Bet Value";

        let maticUSDTPrice = await getPrice("MATICUSDT");
        console.log(`Bet Matic USDT price ${maticUSDTPrice}`);
        if(maticUSDTPrice > 0) {
          let maticAmount = betAmount/maticUSDTPrice;
          console.log(`Bet Matic bet Amount ${maticAmount}`);
          let amountInWei = web3.utils.toWei(`${maticAmount}`);
          console.log(`Bet Amount in wei ${amountInWei}`);
          let txOptions = {
            from: userAddress,
            value: amountInWei
          };

          smartContract.methods.placeTheBet(betValue, getTimeInSeconds()).estimateGas(txOptions)
          .then(function(gasAmount){
            txOptions.gas = gasAmount;

            smartContract.methods.placeTheBet(betValue, getTimeInSeconds()).send(txOptions)
            .on('transactionHash', function(hash){
              console.log(`Bet placed with value ${betIndicator} and betAmount ${betAmount} with txHash ${hash}`);
              showSnack("Place bet transaction sent. Waiting for confirmation ...", {variant: 'info'});
            })
            .once('confirmation', function(confirmationNumber, receipt){
              console.log(`Bet placed Confirmation`);
              console.log(receipt);
              showSnack("Successfully placed the bet. Lets wait for the results ...", {variant: 'success'});
            })
            .on('error', function(error, receipt) {
              console.error(error);
              showSnack('Error while placing the bet', {variant: 'error'});
            });
          })
          .catch(function(error){
              console.error(error);
              showSnack(
                'Error while placing the bet. Make sure you have sufficient amount of matic tokens in your account',
                {variant: 'error'}
              );
          });
        } else {
          console.error(`Matic-USDT price should be greater than 0. Current value ${maticUSDTPrice}`);
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
    const nonce = await getUserNonce(userAddress);
    console.log(`nonce from api ${nonce}`);
    if(nonce !== undefined) {
      const rawMessage = "Sign message to prove your identity with tracking id ";
      const messageToSign = `${rawMessage}${nonce}`;
      const signedMessage = await web3.eth.personal.sign(
        messageToSign,
        userAddress
      );

      if(signedMessage) {
        console.log(signedMessage);
        let payload = {};
        payload.walletId = 1;
        payload.publicAddress = userAddress;
        payload.signature =  signedMessage;
        payload.message = rawMessage;
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
              initUserInfo();
              if(data.existingUser) {
                showSnack(`Login successfull`, {variant: 'success'});
              } else {
                showSnack(`Registration successfull`, {variant: 'success'});
                promptForUserName();
              }
            }
          }
        })
        .catch(function(error) {
          setOverlayActive(false);
          console.log(error);
          showSnack(`Error during login ${error.message}`, {variant: 'error'});
        });
      }
    } else {
      showSnack(`Unable to get user tracking id from server`, {variant: 'error'});
    }
  }

  const initUserInfo = async ()=>{
    // Get user balance
    let userAddress = localStorage.getItem(LS_KEY.USER_ADDRESS);
    if(!userAddress) {
      userAddress = await wallet.getUserAccount(web3);
    }
    if(!userAddress) {
      showSnack(`Unable to get user account`, {variant: 'error'});
    }
    console.log(userAddress);
    let balanceInWei = await web3.eth.getBalance(userAddress);
    let balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
    let maticUSDTPrice = await getPrice(config.symbol);
    let userInfo = {};
    try {
      let balanceInUSDT = parseFloat(maticUSDTPrice) * parseInt(balanceInEther);
      userInfo.balanceInUSDT = balanceInUSDT;
    } catch(error) {
      console.log(error);
      console.log("Error while converting matic balance to USDT");
      showSnack("Error while converting matic balance to USDT", {variant: "error"});
    }
    userInfo.balanceInWei = balanceInWei;
    userInfo.balanceInEther = balanceInEther;

    setUserInfo(userInfo);
    console.log(userInfo);
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
        setUpdateUserMessage(`Login failed. Please tell us about it on support@biconomy.io.`);
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

  const onLogin = async () => {
    await wallet.init();
    web3.eth.getAccounts((error, accounts) => {
      if(error) {
        setOverlayActive(false);
        showSnack(`Error while fetching account from Portis`, {variant: 'error'});
      } else {
        if(accounts && accounts.length > 0) {
          let userAddress = accounts[0];
          setOverlayMessage(`Getting your account ...`);
          setOverlayActive(true);
          login(userAddress);
        } else {
          setOverlayActive(false);
          showSnack(`Error while fetching your account`, {variant: 'error'});
        }
      }
    });
  }

  const onLogout = ()=>{
    clearUserLoginData();
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
  }

  const handleDialogAction = ()=>{
    updateUser(userAddress, username);
  }

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
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

  return (
      <div className="App" id="Home">
        <LandingPage currentState={currentState} changeState={changeState} onLogin={onLogin}
          userLogin={userLogin} username={username} promptForUsername={promptForUserName} onLogout={onLogout}
          wallet={wallet} userInfo={userInfo} getPrice={getPrice} setOverlayActive={props.setOverlayActive}
          setOverlayMessage={props.setOverlayMessage} showSnack={showSnack} counter={counter}
          requestCurrentPrice={requestCurrentPrice} lastPrice={lastPrice} lastPriceUnit={config.lastPriceUnit}
          stakePrice={stakePrice} requestStakePrice={requestStakePrice} userAddress={userAddress}
          placeBet={placeBet} betUpList={betUpList} betDownList={betDownList} winners={winners}
          loosers={loosers} resultBetValue={resultBetValue} betPlaced={betPlaced}/>

        <FormDialog open={openNameDialog} title="One last thing" contentText="What should we call you?"
          handleClose={handleDialogClose} handleCancel={handleDialogClose} handleAction={handleDialogAction}
          children={nameDialogContent} cancelText="Skip"/>
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