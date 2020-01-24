import React, { Component } from 'react';
import PriceScaleGauge from './PriceScaleGauge';
import TwitterIcon from '@material-ui/icons/Twitter';

class ResultLeftComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            seconds: props.counter
        };
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
                    {this.props.betPlaced && this.props.betPlaced.betValueString && this.props.isWinner &&
                        <span className="winner stamp is-approved mobile">You Won</span>
                    }

                    {this.props.betPlaced && this.props.betPlaced.betValueString && !this.props.isWinner &&
                        <span className="looser stamp is-lost mobile">You Lost</span>
                    }

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
                            <span className="winner stamp is-approved non-mobile">Hurray!! You Won</span>
                            <span className="result-span focus-style">Prize money is transfered to your account</span>
                            <span className="result-span buckle-up focus-style">Buckle up! Next game is about to start</span>
                        </div>
                        }

                        {this.props.betPlaced && this.props.betPlaced.betValueString && !this.props.isWinner &&
                        <div className="result-content">
                            <span className="looser focus-style non-mobile">You Lost</span>
                            <span className="result-span">Next game is about to start</span>
                            <span className="result-span buckle-up focus-style">May the Odds be in your Favor</span>
                        </div>
                        }

                        {this.props.betPlaced && !this.props.betPlaced.betValueString &&
                        <div className="result-content">
                            <span className="focus-style">You did not place any bet</span>
                        </div>
                        }
                        <div className="twitter-share">
                            <div id="share-on-twitter">Share on Twitter</div>
                            <div id="twitter-share-button">
                                <a href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Ftest-moonshot.biconomy.io&text=Like%2C%20Share%20%26%20Win%20free%20Matic%20tokens!!%0AFirst%20hundred%20participants%20get%20100%20matic%20tokens%20each%20by%20following%20the%20simple%20steps%0A%0A%2D%20Follow%20%40maticnetwork%20and%20%40biconomy%0A%2D%20Like%20and%20Retweet%20with%20a%20comment%20on%20the%20moonshot%20post%0A%2D%20Tag%205%20of%20your%20friends" target="_">
                                  <TwitterIcon fontSize="large"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ResultLeftComponent;