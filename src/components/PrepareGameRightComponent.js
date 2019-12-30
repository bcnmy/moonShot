import React, { Component } from 'react';
import TextLoop from "react-text-loop";

class PrepareGameRightComponent extends Component{

    constructor(props) {
        super(props);
        this.requestCurrentPrice = props.requestCurrentPrice;
    }

    componentDidMount() {
        this.requestCurrentPrice();
    }

    render(){
        return(
            <section className="prepare-page-right">

                <div className="price-container">
                    <div className="price-container-heading">Matic current price</div>
                    <div className="price-value high-price">
                        {this.props.lastPrice} {this.props.lastPriceUnit}
                    </div>
                </div>
                {/* <div className="Gaming-rules">
                    <div id="rules">

                    </div>
                </div> */}
                {/* <div className="quotes-container">
                        <TextLoop className="quotes" springConfig={{ stiffness: 70, damping: 10 }}
                            adjustingSpeed={1000}>
                            <h4> Never let Success get to your head.<br/><br/>
                                    Never let Failure get to your heart.
                            </h4>
                            <h4>
                                No Risk, No Gain
                            </h4>
                            <h4>
                                Harder the Battle <br/><br/>
                                Sweeter the Victory
                            </h4>
                            <h4>
                                It Never gets Easier,<br/><br/>
                                You just get Better
                            </h4>
                            <h4>
                                In the End we will only<br/><br/><center> REGRET</center><br/> The changes we didn't take
                            </h4>
                        </TextLoop>
                </div> */}

            </section>
        );
    }
}

export default PrepareGameRightComponent;