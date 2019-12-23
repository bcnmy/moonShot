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
                userLogin={this.props.userLogin} username={this.props.username} promptForUsername={this.props.promptForUsername}
                onLogout={this.props.onLogout} wallet={this.props.wallet} userInfo={this.props.userInfo} getPrice={this.props.getPrice}
                setOverlayActive={this.props.setOverlayActive} setOverlayMessage={this.props.setOverlayMessage}
                showSnack={this.props.showSnack}/>
                <div className="center">
                    <LeftSection currentState={this.props.currentState} changeState={this.props.changeState} getPrice={this.props.getPrice}/>
                    <RightSection currentState={this.props.currentState} changeState={this.props.changeState}/>
                </div>
                {this.props.currentState==="launch" && <Footer />}
            </div>
        );
    }
}

export default LandingPage;