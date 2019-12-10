import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import LandingPage from './components/LandingPage';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Web3 from 'web3';
import axios from 'axios';

const notistackRef = React.createRef();
const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));
let appRoot = require('app-root-path');
const {config} = require(`${appRoot}/config`);

const Portis = require('@portis/web3');

const LAUNCH = "launch";
const PREPARE = "prepare";
const WAITING = "waiting";
const START='start';

const portis = new Portis('bedf09f0-224f-45a9-a54e-f1629c9d9592', 'maticTestnet', { registerPageByDefault: true });
const web3 = new Web3(portis.provider);

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [currentState, changeState] = React.useState(START);
  const [userLogin, setUserLogin] = React.useState(false);

  const onLogin = () => {
    web3.eth.getAccounts((error, accounts) => {
      if(error) {
        showSnack(`Error while fetching account from Portis`, {variant: 'error'});
      } else {
        if(accounts && accounts.length > 0) {
          let userAddress = accounts[0];
          let userLoginPath = `${config.baseURL}${config.loginPath}`;
          let payload = {};
          payload.walletId = 1;
          payload.publicAddress = userAddress;

          axios
          .post(userLoginPath, payload)
          .then(function(response) {
            if(response && response.status != 200) {
              showSnack(`Login failed. Please tell us about it on support@biconomy.io.`, {variant: 'error'});
            } else {
              const data = response.data;
              if(data.code === 200) {
                setUserLogin(true);
                if(data.existingUser) {
                  showSnack(`Login successfull`, {variant: 'success'});
                } else {
                  showSnack(`Registration successfull`, {variant: 'success'});
                }
              }
            }
          })
          .catch(function(error) {
            console.log(error);
            showSnack(`Error during login ${error.message}`, {variant: 'error'});
          });
        } else {
          showSnack(`Error while fetching your account`, {variant: 'error'});
        }
      }
    });

  }

  const showSnack = (content, options) => {
    enqueueSnackbar(content, options);
  }

  return (
      <div className="App" id="Home">
        <LandingPage currentState={currentState} changeState={changeState} onLogin={onLogin} userLogin={userLogin}/>
      </div>
  );
}

export default function AppWithSnacks() {
  const classes = useStyles();
  const handleClose = key => () => {
      notistackRef.current.closeSnackbar(key);
  }

  return (
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
      <App/>
    </SnackbarProvider>
  )
}
