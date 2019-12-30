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
                    <div className="final-result">

                    </div>
                </div>
            </section>
        );
    }
}

export default ResultLeftComponent;