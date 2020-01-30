import React, { useState, useEffect, useRef } from 'react';
import posed from 'react-pose';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import {config} from "./../config";

const Box = posed.div({
    state1: {
        x : ({diff})=>{return diff},
        y : 2,
        transition: {
            default:{
                duration: 500
            },
            y: {
                ease: 'easeInOut', duration: 2000
            }
        }
    },
    state2: {
        x : ({diff})=>{return diff},
        y : -2,
        transition: {
            default:{
                duration: 500
            },
            y: {
                ease: 'easeInOut', duration: 2000
            }
        }
    },
    result: {
        x : ({diff})=>{return diff},
        transition: {
            default:{
                duration: 500
            }
        }
    }
  });

const maxPriceDiff = 200;
const minPriceDiff = -200;

export default function PriceScaleGauge(props) {

    const [stakePrice, setStakePrice] = useState(props.stakePrice?props.stakePrice:0);
    const [currentPrice, setCurrentPrice] = useState(props.currentPrice?props.currentPrice:0);
    const [stakePriceUnit, setStakePriceUint] = useState(props.stakePriceUnit);
    const [currentPriceUnit, setCurrentPriceUint] = useState(props.currentPriceUnit);
    const [currentAnimationState, setCurrentAnimationState] = useState('state1');
    const [diff, setDiff] = useState(0);
    const currentAnimationRef = useRef(currentAnimationState)
    const stakePriceRef = useRef(stakePrice);
    const currentPriceRef = useRef(currentPrice);


    const trimPrice = (price)=>{
        let trimmedPrice = price;
        if(trimmedPrice) {
            if(typeof trimmedPrice == 'string') {
                try {
                    trimmedPrice = parseFloat(trimmedPrice);
                } catch(error) {
                    console.log(`Error while converting string value ${trimmedPrice} to float value`);
                }
            }
            if(trimmedPrice && typeof trimmedPrice == 'number') {
                trimmedPrice =  trimmedPrice.toFixed(5);
            }
        }
        return trimmedPrice;
    }

    const setResultEffect = function(currentPrice, stakePrice) {
        if(currentPrice && currentPrice > 0 && stakePrice && stakePrice > 0) {
            let priceDiff = 0;
            priceDiff = parseInt((currentPrice - stakePrice)*(10e5));
            console.log(`Difference in price is ${priceDiff}`)

            if(priceDiff > maxPriceDiff) {
                priceDiff = maxPriceDiff;
            } else if(priceDiff < minPriceDiff) {
                priceDiff = minPriceDiff;
            }
            console.log("PRICE DIFFF",priceDiff)
            setDiff(diff=>priceDiff);
            setCurrentAnimationState("result");
        }
    }

    useEffect(() => {
        console.log(`type of props.currentPrice ${typeof props.currentPrice}`)
        console.log(`type of props.stakePrice ${typeof props.stakePrice}`)

        console.log(`props.currentPrice ${props.currentPrice}`)
        console.log(`props.stakePrice ${props.stakePrice}`)

        if(props.isLive === undefined || props.isLive) {
            const interval = setInterval(async ()=> {

                let stakePrice = stakePriceRef.current;
                let newPrice = currentPriceRef.current;
                console.log(`New price is ${newPrice}`)
                console.log(`Current price is ${currentPrice}`);

                let priceDiff = 0;
                if(newPrice) {
                    newPrice = trimPrice(newPrice);
                    setCurrentPrice(newPrice);

                    priceDiff = parseInt((newPrice - stakePrice)*(10e5));
                    console.log(`Difference in price is ${priceDiff}`)

                    if(priceDiff > maxPriceDiff) {
                        priceDiff = maxPriceDiff;
                    } else if(priceDiff < minPriceDiff) {
                        priceDiff = minPriceDiff;
                    }
                }

                if(currentAnimationRef.current === "state1") {
                    setCurrentAnimationState("state2");
                    setDiff(diff=>priceDiff);
                } else {
                    setCurrentAnimationState("state1");
                    setDiff(diff=>priceDiff);
                }
            }, 1000);
            return () => {
                clearTimeout(interval);
            };
        } else {
            setResultEffect(props.currentPrice, props.stakePrice);
        }
    }, []);



    useEffect(()=>{
        setResultEffect(props.currentPrice, props.stakePrice);
    },[props.stakePrice]);

    useEffect(()=>{
        currentAnimationRef.current = currentAnimationState;
    }, [currentAnimationState])

    useEffect(()=>{
        if(props.stakePrice) {
            let trimmedStakePrice = trimPrice(props.stakePrice);
            stakePriceRef.current = trimmedStakePrice;
            setStakePrice(trimmedStakePrice);
        }
    }, [props.stakePrice]);

    useEffect(()=>{
        console.log("props.current price changed",props.currentPrice);
        if(props.currentPrice !== undefined) {
            let trimmedCurrentPrice = trimPrice(props.currentPrice);
            currentPriceRef.current = trimmedCurrentPrice;
            //setCurrentPrice(trimmedCurrentPrice);
        }
    }, [props.currentPrice]);

    return(
        <div id="price-gauge-container">
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>

            <div className="price-gauge-bars">
                <div id="stake-price-container">
                    <div className="price-label">stake price</div>
                    <div className="price-value">
                        {stakePrice}
                        <div className="price-unit"> {stakePriceUnit}</div>
                    </div>
                    <ArrowDropDownIcon id="stake-price-arrow"/>
                </div>
            </div>

            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>
            <div className="price-gauge-bars"/>

            <Box id="current-price-container" pose={currentAnimationState} diff={diff}>
                <ArrowDropUpIcon id="current-price-arrow" className={diff >= 0 ? 'high-price-icon' : 'low-price-icon'}/>
                <div className={`price-value ${diff >= 0 ? 'high-price' : 'low-price'}`} >
                    {currentPrice}
                    <div className="price-unit"> {currentPriceUnit}</div>
                </div>
                <div className="price-label">{props.currentPriceText?props.currentPriceText:"current price"}</div>
            </Box>
        </div>
    );
}