import React, { Component } from 'react';
import { Button } from '@material-ui/core';
class StartGameLeftComponent extends Component {
    render(){
    return(
        <section className="start-page-left">
            <div className="start-page-heading">
                <div id="start-heading">
                Place Your Bet
                </div>
                <div id="start-timer">
                0:19 seconds
                </div>
            </div>
            <div className="start-page-content">
                <div className="price-container" id="current-stake-price">
                    <div className="price-heading">Current Price</div>
                    <div>$ 0.02950</div>
                </div>
                <div className="price-container" id="fluctuating-price">
                    <div className="price-heading">Betting Price</div>
                    <div>$ 0.02950</div>
                </div>
            </div>   
            <div className="place-bet">
                <div className="field">
                    <input id="" type="text"  placeholder="Enter price"/>
                </div>
            </div>   
            <div className="bet-buttons">
                <Button onClick="" target="_blank" variant="contained" className="bet-placed" id="up-button">
                    Will go Up
                </Button>
                <Button onClick="" target="_blank" variant="contained" className="bet-placed" id="down-button">
                    will go down
                </Button>
            </div>          
        </section>
    );
    }
}

export default StartGameLeftComponent;