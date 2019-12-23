import React, { Component } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class PrepareGameLeftComponent extends Component{

    state = {
        minutes: 0,
        seconds: 30,
        initialValue: 30,
        initialPercentage: 100,
        percentage: 100
    }

    
    
    componentDidMount() {
        const {initialValue, initialPercentage } = this.state
        let percentageInterval = initialPercentage/initialValue;

        this.myInterval = setInterval(() => {
            const { seconds, minutes, percentage } = this.state
    

            if (seconds > 0) {
                this.setState({
                    seconds: seconds - 1,
                    percentage: percentage - percentageInterval
                })
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
        const { minutes, seconds, percentage } = this.state
        return(
            <section className="prepare-page-left">
                <div className="prepare-page-heading">
                    <div id="prepare-heading">
                        Estimating Stake Price
                        <div id="prepare-matic-price">$ 0.19</div>
                    </div>
                </div>
                <div className="prepare-page-content">
                    <div className="staking-price">
                        { minutes === 0 && seconds === 0
                        ? <h3>Game is Starting NOW !!! ....</h3>
                        : <CircularProgressbar className="circularProgressBar" value={percentage} text={seconds}
                        styles={buildStyles({
                            textColor: "white",
                            pathColor: "gold",
                            trailColor: "white"
                          })}/>
                        }   
                    </div>
                </div>             
            </section>
        );
    }
}

export default PrepareGameLeftComponent;