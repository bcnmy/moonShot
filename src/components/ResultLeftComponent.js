import React, { Component } from 'react';
import PriceScaleGauge from './PriceScaleGauge';

class ResultLeftComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            seconds: props.counter
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.counter) {
            this.setState({seconds: nextProps.counter});
        }
    }

    componentDidMount() {
        if(this.props.requestStakePrice) {
            this.props.requestStakePrice();
        }

        this.myInterval = setInterval(() => {
            const { seconds } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
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
        console.log(`Is Winner ${this.props.isWinner}`);
        console.log(`Bet Placed ${JSON.stringify(this.props.betPlaced)}`);
        return(
            <section className="result-page-left">

                <div className="state-page-heading">
                    <div className="state-heading-timer">
                    { seconds === 0
                    ? <span>Starting next game</span>
                    : <p><span className="time-remaining-counter">{`${seconds}`}</span>seconds</p>
                    }
                    </div>

                    <div className="state-heading-desc">
                        Game Finished
                    </div>
                </div>
                <div className="result-page-content">

                    <PriceScaleGauge stakePrice={this.props.stakePrice} stakePriceUnit={this.props.lastPriceUnit}
                        currentPrice={this.props.resultPrice} currentPriceUnit={this.props.lastPriceUnit}
                        getPrice={this.props.getPrice} isLive={false} currentPriceText="result price"/>

                    <div className="bet-result-string focus-style">
                        {this.props.resultBetValue === 1 && this.props.resultPrice.toString() !== this.props.stakePrice
                             && <span>Price went UP</span>}
                        {this.props.resultBetValue === 1 && this.props.resultPrice.toString() === this.props.stakePrice
                             && <span>Price remained SAME</span>}
                        {this.props.resultBetValue === 2 && <span>Price went DOWN</span>}
                    </div>

                    <div className="final-result">
                        {this.props.betPlaced && this.props.betPlaced.betValueString && this.props.isWinner &&
                        <div className="result-content">
                            <span className="winner">Hurray!! You Won</span>
                            <span className="result-span focus-style">Prize money is transfered to your account</span>
                            <span className="result-span buckle-up focus-style">Buckle up! Next game is about to start</span>
                        </div>
                        }

                        {this.props.betPlaced && this.props.betPlaced.betValueString && !this.props.isWinner &&
                        <div className="result-content">
                            <span className="looser focus-style">You Lost</span>
                            <span className="result-span">Next game is about to start</span>
                            <span className="result-span buckle-up focus-style">May the Odds be in your Favor</span>
                        </div>
                        }

                        {this.props.betPlaced && !this.props.betPlaced.betValueString &&
                        <div className="result-content">
                            <span className="focus-style">You did not place any bet</span>
                        </div>
                        }

                    </div>
                </div>
            </section>
        );
    }
}

export default ResultLeftComponent;