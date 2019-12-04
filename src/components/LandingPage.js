import React, { Component } from 'react';
import Header from './Header';
import LeftSection from './LeftSection';
import RightSection from './RightSection';


class LandingPage extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="main-section">
                <Header currentState={this.props.currentState} changeState={this.props.changeState}/>
                <div className="center">
                    <LeftSection currentState={this.props.currentState} changeState={this.props.changeState}/>
                    <RightSection currentState={this.props.currentState} changeState={this.props.changeState}/>
                </div>
            </div>
        );
    }
}

export default LandingPage;