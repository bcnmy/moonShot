import React, { Component } from 'react';

class ResultRightComponent extends Component{

    render(){
        const winners = this.props.winners.map((item, key) => {return <div className="result-list-item">
            <span className="user-name">{item}</span>
            {/* <span className="bet-amount">{item.betAmountUSDT}</span> */}
        </div>});

        return(
            <section className="result-page-right">
                <div className="winners">
                    <div className="winner-list">
                        <div id="winner-header" className="winner-header">Winners</div>
                        <div className="win-list" id="win-list">
                            {winners}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ResultRightComponent;