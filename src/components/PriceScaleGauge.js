import React, { useState, useEffect, useRef } from 'react';
import posed from 'react-pose';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import {config} from "./../config";

const Box = posed.div({
    state1: {
        x : ({diff})=>{return diff},
        transition: {
            duration: 500
        }
    },
    state2: {
        x : ({diff})=>{return diff},
        transition: {
            duration: 500
        }
    }
  });

export default function PriceScaleGauge(props) {

    const [stakePrice, setStakePrice] = useState(props.stakePrice);
    const [currentPrice, setCurrentPrice] = useState(props.currentPrice);
    const [stakePriceUnit, setStakePriceUint] = useState(props.stakePriceUnit);
    const [currentPriceUnit, setCurrentPriceUint] = useState(props.currentPriceUnit);
    const [currentAnimationState, setCurrentAnimationState] = useState('state1');
    const [diff, setDiff] = useState(1);
    const currentAnimationRef = useRef(currentAnimationState)
    const stakePriceRef = useRef(stakePrice);

    useEffect(() => {
        const interval = setInterval(async ()=> {
            let stakePrice = stakePriceRef.current;
            let newPrice = await props.getPrice(config.symbol);
            if(typeof newPrice == 'string') {
                try {
                    newPrice = parseFloat(newPrice);
                } catch(error) {
                    console.log(`Error while converting string value ${newPrice} to float value`);
                }
            }
            if(newPrice && typeof newPrice == 'number') {
                newPrice =  newPrice.toFixed(5);
            }
            setCurrentPrice(newPrice);

            let priceDiff = newPrice - stakePrice;
            console.log(`Difference in price is ${priceDiff}`)


            if(currentAnimationRef.current == "state1") {
                setCurrentAnimationState("state2");
                setDiff(diff=>diff+(Math.random()*10));
            } else {
                setCurrentAnimationState("state1");
                setDiff(diff=>diff-(Math.random()*10));
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(()=>{
        currentAnimationRef.current = currentAnimationState;
    }, [currentAnimationState])

    useEffect(()=>{
        stakePriceRef.current = props.stakePrice;
        setStakePrice(props.stakePrice);
    }, [props.stakePrice]);

    return(
        <div id="price-gauge-container">
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            
            <div className="price-gauge-bars">
                <div id="stake-price-container">
                    <div className="price-value">{`${props.stakePrice} ${stakePriceUnit}`}</div>
                    <ArrowDropDownIcon id="stake-price-arrow"/>
                </div>
            </div>
            
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>

            <Box id="current-price-container" pose={currentAnimationState} diff={diff}>
                <ArrowDropUpIcon id="current-price-arrow"/>
                <div className="price-value">{`${currentPrice} ${currentPriceUnit}`}</div>
            </Box>
        </div>
    );
}