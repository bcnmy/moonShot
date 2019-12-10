import React, { Component } from 'react';
import Header from './Header';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Footer from './Footer';


class LandingPage extends Component{

    render() {
        return(
            <div className="main-section">
                <Header currentState={this.props.currentState} changeState={this.props.changeState} onLogin={this.props.onLogin}
                userLogin={this.props.userLogin}/>
                <div className="center">
                    <LeftSection currentState={this.props.currentState} changeState={this.props.changeState}/>
                    <RightSection currentState={this.props.currentState} changeState={this.props.changeState}/>
                </div>
                <Footer />
            </div>
        );
    }
}

export default LandingPage;