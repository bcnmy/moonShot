import React, { Component } from 'react';

class StartGameRightComponent extends Component{

    render(){
        return(
            <section className="start-page-right">
                <div className="players">
                    <div className="player-list">
                        <div id="player-up-bet" className="player-header">Bet Up</div>
                        <div className="play-list" id="play-list">
                            <div className="player-name">Sachin</div>
                        </div>
                        
                    </div>
                    <div className="player-list">
                        <div id="player-down-bet" className="player-header">Bet Down</div>
                        <div className="play-list" id="play-list">
                            <div className="player-name">Divya</div>
                        </div>
                        
                    </div>
                </div>             
            </section>
        );
    }
}

export default StartGameRightComponent;