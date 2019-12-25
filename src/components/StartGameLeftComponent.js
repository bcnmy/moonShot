import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class StartGameLeftComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            minutes: 0,
            seconds: props.counter,
        }
        this.betUp = this.betUp.bind(this);
        this.betDown = this.betDown.bind(this);
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

    betUp() {
        console.log('bet up');
    }

    betDown() {
        console.log('bet down');
    }

    render(){
        const { minutes, seconds } = this.state
        return(
            <section className="start-page-left">
                <div className="start-page-heading">
                    <div id="start-heading">
                    Place Your Bet
                    </div>
                    <div id="start-timer">
                    { minutes === 0 && seconds === 0
                    ? <span>Moving on to next phase</span>
                    : <p><span>Time Remaining:</span> {seconds} sec</p>
                    }
                    </div>
                </div>
                <div className="start-page-content">
                    <div className="price-container" id="current-stake-price">
                        <div className="price-heading">Current Price</div>
                        <div className="price-value">$ 0.02950</div>
                    </div>
                    <div className="price-container" id="fluctuating-price">
                        <div className="price-heading">Betting Price</div>
                        <div className="price-value">$ 0.02950</div>
                    </div>
                </div>
                <div className="place-bet">
                    <div className="field">
                        <input id="" type="number"  placeholder="Enter price" disabled={seconds==0?true:false}/>
                    </div>
                </div>
                <div className="bet-buttons">
                    <Button onClick="" target="_blank" variant="contained" className="bet-placed" id="up-button" disabled={seconds==0?true:false} >
                        Will go Up
                    </Button>
                    <Button onClick="" target="_blank" variant="contained" className="bet-placed" id="down-button" disabled={seconds==0?true:false}>
                        will go down
                    </Button>
                </div>
            </section>
        );
    }
}

export default StartGameLeftComponent;