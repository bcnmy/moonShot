import React, { useState, useEffect } from 'react';
import LaunchLeftComponent from './LaunchLeftComponent';
import WaitLeftComponent from './WaitLeftComponent';
import PrepareGameLeftComponent from './PrepareGameLeftComponent';
import StartGameLeftComponent from './StartGameLeftComponent';
import ResultLeftComponent from './ResultLeftComponent';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
const {config} = require("./../config");
const {LAUNCH, PREPARE, WAITING, START, RESULT} = config.state;

function getSteps() {
    return ['PREPARE', 'START', 'WAITING', 'RESULT'];
}

function getStepCount(state) {
    if(state === PREPARE) {
        return 0;
    } else if(state === START) {
        return 1;
    } else if(state === WAITING) {
        return 2;
    } else if(state === RESULT) {
        return 3;
    }
    return 0;
}

export default function LeftSection(props) {
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    useEffect(()=>{
        setActiveStep(getStepCount(props.currentState));
    },[props.currentState])

    return (
        <section className = "leftSection">

            {props.currentState!=   =LAUNCH &&
                <Stepper activeStep={activeStep} className="stepper">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            }

            {props.currentState === LAUNCH && <LaunchLeftComponent changeComponent={props.changeState}/>}
            {props.currentState === PREPARE &&
                <PrepareGameLeftComponent changeComponent={props.changeState} counter={props.counter} />
            }
            {props.currentState === START &&
                <StartGameLeftComponent changeComponent={props.changeState} counter={props.counter}
                    lastPrice={props.lastPrice} lastPriceUnit={props.lastPriceUnit}
                    stakePrice={props.stakePrice} requestCurrentPrice={props.requestCurrentPrice}
                    requestStakePrice={props.requestStakePrice} userAddress={props.userAddress}
                    userLogin={props.userLogin} userInfo={props.userInfo} showSnack={props.showSnack}
                    placeBet={props.placeBet} betPlaced={props.betPlaced} />
            }
            {props.currentState === WAITING &&
                <WaitLeftComponent changeComponent={props.changeState} getPrice={props.getPrice}
                lastPrice={props.lastPrice} lastPriceUnit={props.lastPriceUnit} stakePrice={props.stakePrice}
                counter={props.counter} requestCurrentPrice={props.requestCurrentPrice}
                requestStakePrice={props.requestStakePrice}/>
            }
            {props.currentState === RESULT &&
                <ResultLeftComponent changeComponent={props.changeState} counter={props.counter}
                    stakePrice={props.stakePrice} requestStakePrice={props.requestStakePrice} winners={props.winners}
                    loosers={props.loosers} resultBetValue={props.resultBetValue} betPlaced={props.betPlaced}
                    isWinner={props.isWinner} resultPrice={props.resultPrice} lastPriceUnit={props.lastPriceUnit}
                    getPrice={props.getPrice}
                />
            }

        </section>
    )
}