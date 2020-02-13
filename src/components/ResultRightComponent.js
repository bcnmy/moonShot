import React, { Component } from 'react';
const {config} = require("./../config");
const {trim} = require("../utils");

class ResultRightComponent extends Component{

    render() {

        let winners = [];
        if(this.props.winners) {
            winners = this.props.winners.map((item, key) => {return <div className="result-list-item">
                <span className="user-name">{item.username}</span>
                <span className="user-name">{ trim((parseFloat(item.betAmountUSDT) + parseFloat(item.winAmountUSDT)),5)} {config.betDisplayUnit}</span>
            </div>});
        }

        return(
            <section className="result-page-right">
                <div className="winners">
                    <div className="winner-list">
                        <div id="winner-header" className="winner-header">Winners</div>
                        <div className="win-list-header">
                            <span>USERNAME</span>
                            <span>AMOUNT WON</span>
                        </div>
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