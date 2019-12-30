import React, { Component } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class PrepareGameLeftComponent extends Component{

    constructor(props) {
        super(props);
        console.log(props.counter);
        this.state = {
            seconds: props.counter,
            initialValue: props.counter,
            initialPercentage: 100,
            percentage: 100,
            counterSet: (props.counter > 0) ? true : false
        }
        this.startTimer = this.startTimer.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let self = this;
        if(nextProps.counter !== this.state.seconds) {
            this.setState({
                seconds: nextProps.counter,
                initialValue: nextProps.counter,
                counterSet: true},()=>{
                    if(!self.myInterval) {
                        self.startTimer();
                    }
                });
        }
    }

    componentDidMount() {
        if(this.state.counterSet) {
            if(!this.myInterval) {
                this.startTimer();
            }
        }
    }

    startTimer() {
        const {initialValue, initialPercentage } = this.state
        let percentageInterval = initialPercentage/initialValue;

        this.myInterval = setInterval(() => {
            const { seconds, percentage } = this.state
            if (seconds > 0) {
                this.setState({
                    seconds: seconds - 1,
                    percentage: percentage - percentageInterval
                })
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
        const {seconds, percentage } = this.state
        return(
            <section className="prepare-page-left">
                <div className="prepare-page-heading">

                </div>
                <div className="prepare-page-content">
                    <div className="prepare-staking-price">
                        {
                            this.state.seconds !== 0
                            ? <div className="prepare-page-message">Please wait while we get Matic average price</div>
                            : <div className="prepare-page-message">Game is Starting Now</div>
                        }
                        {
                            !this.state.counterSet
                            ? <h3>Fetching game data ...</h3>
                            : this.state.seconds === 0
                                ? ""
                                : <CircularProgressbar className="circularProgressBar" value={percentage} text={seconds}
                                    styles={buildStyles({ textColor: "white", pathColor: "gold", trailColor: "white"})}/>
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default PrepareGameLeftComponent;