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
    }
  });

const maxPriceDiff = 200;
const minPriceDiff = -200;

export default function PriceScaleGauge(props) {

    const [stakePrice, setStakePrice] = useState(props.stakePrice);
    const [currentPrice, setCurrentPrice] = useState(props.currentPrice);
    const [stakePriceUnit, setStakePriceUint] = useState(props.stakePriceUnit);
    const [currentPriceUnit, setCurrentPriceUint] = useState(props.currentPriceUnit);
    const [currentAnimationState, setCurrentAnimationState] = useState('state1');
    const [diff, setDiff] = useState(0);
    const currentAnimationRef = useRef(currentAnimationState)
    const stakePriceRef = useRef(stakePrice);

    useEffect(() => {
        const interval = setTimeout(async ()=> {
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

            let priceDiff = parseInt((newPrice - stakePrice)*(10e5));
            console.log(`Difference in price is ${priceDiff}`)

            if(priceDiff > maxPriceDiff) {
                priceDiff = maxPriceDiff;
            } else if(priceDiff < minPriceDiff) {
                priceDiff = minPriceDiff;
            }


            if(currentAnimationRef.current === "state1") {
                setCurrentAnimationState("state2");
                setDiff(diff=>priceDiff);
            } else {
                setCurrentAnimationState("state1");
                setDiff(diff=>priceDiff);
            }
        }, 500);

        return () => {
            clearTimeout(interval);
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
                    <div className="price-label">stake price</div>
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
                <ArrowDropUpIcon id="current-price-arrow" className={diff >= 0 ? 'high-price-icon' : 'low-price-icon'}/>
                <div className={`price-value ${diff >= 0 ? 'high-price' : 'low-price'}`} >{`${currentPrice} ${currentPriceUnit}`}</div>
                <div className="price-label">current price</div>
            </Box>
        </div>
    );
}