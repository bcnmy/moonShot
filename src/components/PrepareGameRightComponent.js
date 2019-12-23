import React, { Component } from 'react';
import TextLoop from "react-text-loop";

class PrepareGameRightComponent extends Component{

    render(){
        return(
            <section className="prepare-page-right">
                {/* <div className="Gaming-rules">
                    <div id="rules">
                        
                    </div>
                </div> */}
                <div className="quotes-container">
                        <TextLoop className="quotes" springConfig={{ stiffness: 70, damping: 10 }}
                            adjustingSpeed={1000}>
                            <h4> Never Let Success <br/>get to your head.<br/><br/>
                                    Never Let failure <br/>get to your heart.
                            </h4>
                            <h4> 
                                No Risk, No Gain
                            </h4>
                            <h4> 
                                God Helps those who GAMBLE 
                            </h4>
                        </TextLoop>
                </div>
                            
            </section>
        );
    }
}

export default PrepareGameRightComponent;