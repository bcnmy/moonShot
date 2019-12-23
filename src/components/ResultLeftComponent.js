import React, { Component } from 'react';

class ResultLeftComponent extends Component{

    render(){
        return(
            <section className="result-page-left">
                <div className="result-page-heading">
                    <div id="result-heading">
                        Next Game will start in
                        <div id="result-content">
                        </div>
                        <div id="result-page-timer" className="mt-4">
                            0:19 seconds
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