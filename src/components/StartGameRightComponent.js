import React, { Component } from 'react';

class StartGameRightComponent extends Component{

    componentDidMount() {
        console.log(this.props.betUpList);

    }
    render() {
        const upList = this.props.betUpList.map((item, key) => {return <div className="bet-list-item">
            <span className="user-name">{item.userName}</span>
            <span className="bet-amount">{item.betAmountUSDT}</span>
        </div>});
        const downList = this.props.betDownList.map((item, key) => <div className="bet-list-item">
            <span className="user-name">{item.userName}</span>
            <span className="bet-amount">{item.betAmountUSDT}</span>
        </div>);
        return(
            <section className="start-page-right">
                <div className="players">
                    <div className="player-list">
                        <div id="player-up-bet" className="player-header">Bet Up (In USDT)</div>
                        <div className="play-list" id="play-list">
                            {upList}
                        </div>

                    </div>
                    <div className="player-list">
                        <div id="player-down-bet" className="player-header">Bet Down (In USDT)</div>
                        <div className="play-list" id="play-list">
                            {downList}
                        </div>

                    </div>
                </div>
            </section>
        );
    }
}

export default StartGameRightComponent;