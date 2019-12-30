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

    componentDidMount() {
        if(this.props.requestCurrentPrice) {
            this.props.requestCurrentPrice();
        }

        if(this.props.requestStakePrice) {
            this.props.requestStakePrice();
        }

        this.myInterval = setInterval(() => {
            const { seconds } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({seconds: seconds - 1}))
                if(seconds%3 === 0 && this.props.requestCurrentPrice) {
                    this.props.requestCurrentPrice();
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

    render(){
        const { seconds } = this.state
        return(
            <section className="wait-page-left">
                <div className="state-page-heading">
                    <div className="state-heading-timer">
                    { seconds === 0
                    ? <span>Hold your breath </span>
                    : <p><span className="time-remaining-counter">{`${seconds}`}</span>seconds</p>
                    }
                    </div>

                    <div className="state-heading-desc">
                        Results are being calculated
                    </div>
                </div>
                <div className="wait-page-content">
                    <div className="staking-price">
                       <PriceScaleGauge stakePrice={this.props.stakePrice} stakePriceUnit={this.props.lastPriceUnit}
                        currentPrice={this.props.lastPrice} currentPriceUnit={this.props.lastPriceUnit}
                        getPrice={this.props.getPrice}/>
                    </div>
                </div>
            </section>
        );
    }
}

export default WaitLeftComponent;