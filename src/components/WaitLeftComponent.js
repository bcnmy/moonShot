import React, { Component } from 'react';
import PriceScaleGauge from './PriceScaleGauge';
import {config} from "./../config";

class WaitLeftComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            minutes: 0,
            seconds: props.counter,
            maticPrice: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.counter) {
            this.setState({seconds: nextProps.counter});
        }
    }

    componentDidMount() {

        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render(){
        const { minutes, seconds } = this.state
        return(
            <section className="wait-page-left">
                <div className="wait-page-heading">
                    <div id="wait-heading">
                        Waiting Phase
                        <div id="wait-content">
                            Result Calculation in Progress ...
                        </div>
                    </div>
                    <div id="timer">
                    { minutes === 0 && seconds === 0
                    ? <p>Busted!</p>
                    : <p>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                    }
                    </div>
                </div>
                <div className="wait-page-content">
                    <div className="staking-price">
                       <PriceScaleGauge stakePrice={this.state.maticPrice} stakePriceUnit="USDT"
                       currentPrice={this.state.maticPrice} currentPriceUnit="USDT" getPrice={this.props.getPrice}/>
                    </div>
                </div>
            </section>
        );
    }
}

export default WaitLeftComponent;