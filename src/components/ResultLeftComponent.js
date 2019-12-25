import React, { Component } from 'react';

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
        return(
            <section className="result-page-left">
                <div className="result-page-heading">
                    <div id="result-heading">
                        Next Game will start in
                        <div id="result-content">
                        </div>
                        <div id="result-page-timer" className="mt-4">
                            {this.state.seconds} seconds
                        </div>
                    </div>
                    <div className="last-game">
                        <div className="last-stake-price">Last Stake Price : $1.09</div>
                    </div>
                </div>
                <div className="result-page-content">
                    <div className="final-result"> Below either one the message can be shown<br/> <br/>
                        You Loose :( <br/>
                        You Win :) <br/>OR<br/> You din't place a bet
                    </div>
                </div>
            </section>
        );
    }
}

export default ResultLeftComponent;