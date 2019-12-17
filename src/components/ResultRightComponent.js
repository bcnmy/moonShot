import React, { Component } from 'react';

class ResultRightComponent extends Component{

    render(){
        return(
            <section className="result-page-right">
                <div className="winners">
                    <div className="winner-list">
                        <div id="winner-header" className="winner-header">Winners</div>
                        <div className="win-list" id="win-list">
                            <div className="winner-name">Sachin</div>
                            <div className="partition"></div>
                            <div className="win-amount">$ 1.0</div>
                        </div>
                        <div className="win-list" id="win-list">
                            <div className="winner-name">Sachin</div>
                            <div className="partition"></div>
                            <div className="win-amount">$ 1.0</div>
                        </div><div className="win-list" id="win-list">
                            <div className="winner-name">Sachin</div>
                            <div className="partition"></div>
                            <div className="win-amount">$ 1.0</div>
                        </div>
                    </div>
                </div>             
            </section>
        );
    }
}

export default ResultRightComponent;