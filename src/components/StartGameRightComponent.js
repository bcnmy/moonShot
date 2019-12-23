import React, { Component } from 'react';

class StartGameRightComponent extends Component{

    render(){
        return(
            <section className="start-page-right">
                <div className="blockchain-confirmation-block">
                    <div id="goFast">
                        Waiting for Transaction to confirm on block.. 
                    </div>
                </div>
                <div className="rules-container">
                    <div id="rule-points" className="mt-4 pt-4 pl-5">
                        <img className="go-fast" src="/images/Loading.gif" alt="Biconomy logo white" />
                    </div>
                </div>
                            
            </section>
        );
    }
}

export default StartGameRightComponent;