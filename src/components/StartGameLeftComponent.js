import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import PriceScaleGauge from './PriceScaleGauge';
import {web3} from '../App';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';
const {config} = require("./../config");


class StartGameLeftComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seconds: props.counter,
            betAmount: undefined,
            closeCover: props.userLogin
        }
        this.betUp = this.betUp.bind(this);
        this.betDown = this.betDown.bind(this);
        this.onBetAmountChanged = this.onBetAmountChanged.bind(this);
        this.closeBetCover = this.closeBetCover.bind(this);
        this.openLoadingCover = this.openLoadingCover.bind(this);
        this.handleSelectPriceClick = this.handleSelectPriceClick.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(this.props.userLogin !== newProps.userLogin) {
            this.setState({closeCover: newProps.userLogin});
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))

                if(seconds % config.requestPriceIntervalInSec === 0) {
                    if(this.props.requestCurrentPrice) {
                        console.log(`Request current price is ${JSON.stringify(this.props.requestCurrentPrice)}`)
                        this.props.requestCurrentPrice();
                    }
                }
            }
            if (seconds === 0) {
                clearInterval(this.myInterval)
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    closeBetCover() {
        this.setState({
            closeCover: true
        });
    }

    openLoadingCover() {
        this.setState({
            closeCover: false
        });
    }

    handleSelectPriceClick(event, value) {
        this.setState({betAmount: value});
    }

    betUp() {
        if(this.props.placeBet) {
            if(this.state.betAmount) {
                this.openLoadingCover();
                this.props.placeBet(1, this.state.betAmount);
            } else {
                this.props.showSnack("Please enter bet amount", {variant: 'error'});
            }
        }
    }

    betDown() {
        if(this.props.placeBet) {
            if(this.state.betAmount) {
                this.openLoadingCover();
                this.props.placeBet(2, this.state.betAmount);
            } else {
                this.props.showSnack("Please enter bet amount", {variant: 'error'});
            }
        }
    }

    onBetAmountChanged(event) {
        if(event.target.value) {
            this.setState({betAmount: event.target.value});
        } else {
            this.setState({betAmount: 0});
        }
    }

    render(){
        const { seconds } = this.state
        let placingBetText = "Placing your bet";
        if(!this.props.userLogin) {
            placingBetText = "Login to play";
        } else {
            placingBetText = "Placing your bet";
        }
        console.log(`close cover ${this.state.closeCover}`);

        if(this.props.betPlaced && this.props.betPlaced.betValueString) {
            placingBetText = "Bet placed"
        }

        return(
            <section className="start-page-left">
                <div className="state-page-heading">
                    <div className="state-heading-timer">
                    { seconds === 0
                    ? <span>Starting next phase</span>
                    : <p><span className="time-remaining-counter">{`${seconds}`}</span>seconds</p>
                    }
                    </div>

                    <div className="state-heading-desc">
                        Start betting now
                    </div>
                </div>
                <div className="start-page-content">
                    <div className="staking-price">
                       <PriceScaleGauge stakePrice={this.props.stakePrice} stakePriceUnit={this.props.lastPriceUnit}
                        currentPrice={this.props.lastPrice} currentPriceUnit={this.props.lastPriceUnit}
                        getPrice={this.props.getPrice}/>
                    </div>
                </div>

                <div className="place-bet-container">

                    <div className={`place-bet-cover ${this.state.closeCover?'hidden':''}`}>
                        <div className={`place-bet-cover-close ${(this.props.betPlaced && this.props.betPlaced.betValueString)|| !this.props.userLogin ?'hidden':""}`}>
                            <CloseIcon onClick={this.closeBetCover}/>
                        </div>
                        <div className="place-bet-cover-content">{placingBetText}</div>

                        {this.props.userLogin &&
                        <LinearProgress color="secondary"
                        className={this.props.betPlaced && this.props.betPlaced.betValueString?'hidden':""}/>}
                    </div>

                    <div className="place-bet">
                        <div className="field">
                            {this.props.userLogin &&
                                <Chip label={`Balance: ${this.props.userInfo.balanceInUSDT} USDT`} className="start-page-user-balance" />
                            }
                            <div className="place-bet-min-balance-label non-mobile">
                                Min Amount: 1 MATIC ~ {this.props.lastPrice} <span className="input-price-unit">USDT</span>
                            </div>
                            <div className="place-bet-min-balance-label mobile">
                                Min Amount: {this.props.lastPrice} <span className="input-price-unit">USDT</span>
                            </div>

                            <div className="input-field-container">
                                <input id="" type="number" placeholder="Enter betting price (In USDT)"
                                disabled={seconds===0 || !this.props.userLogin ? true : false}
                                value={this.state.betAmount} onChange={this.onBetAmountChanged}/>

                                <div className="input-price-buttons">
                                    <Chip
                                        className="input-price-chip"
                                        label={<span> min </span>}
                                        onClick={ (e) => this.handleSelectPriceClick(e, this.props.lastPrice) }/>
                                    <Chip
                                        className="input-price-chip"
                                        label={<span>0.5 <span className="input-price-unit">USDT</span></span>}
                                        onClick={ (e) => this.handleSelectPriceClick(e, 0.5) }/>
                                    <Chip
                                        className="input-price-chip"
                                        label={<span>1 <span className="input-price-unit">USDT</span></span>}
                                        onClick={ (e) => this.handleSelectPriceClick(e, 1) }/>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bet-buttons">
                        <Button onClick={this.betUp} target="_blank" variant="contained" className="bet-placed" id="up-button"
                        disabled={seconds===0 || !this.props.userLogin ? true : false} >
                            Will go Up/Same
                        </Button>
                        <Button onClick={this.betDown} target="_blank" variant="contained" className="bet-placed" id="down-button"
                        disabled={seconds===0 || !this.props.userLogin ? true : false}>
                            will go down
                        </Button>
                    </div>
                </div>
            </section>
        );
    }
}

export default StartGameLeftComponent;