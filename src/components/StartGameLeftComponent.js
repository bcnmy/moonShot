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
            closeCover: true
        }
        this.betUp = this.betUp.bind(this);
        this.betDown = this.betDown.bind(this);
        this.onBetAmountChanged = this.onBetAmountChanged.bind(this);
        this.closeBetCover = this.closeBetCover.bind(this);
        this.openLoadingCover = this.openLoadingCover.bind(this);
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
                        <div className={`place-bet-cover-close ${this.props.betPlaced && this.props.betPlaced.betValueString?'hidden':""}`}>
                            <CloseIcon onClick={this.closeBetCover}/>
                        </div>
                        <div className="place-bet-cover-content">{placingBetText}</div>
                        <LinearProgress color="secondary" className={this.props.betPlaced && this.props.betPlaced.betValueString?'hidden':""}/>
                    </div>
                    <div className="place-bet">
                        <div className="field">
                            <Chip label={`Balance: ${this.props.userInfo.balanceInUSDT} USDT`} className="start-page-user-balance" />
                            <input id="" type="number" placeholder="Enter betting price (In USDT)"
                            disabled={seconds===0 || !this.props.userLogin ? true : false}
                            value={this.state.betAmount} onChange={this.onBetAmountChanged}/>
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