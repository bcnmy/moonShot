import React, { Component } from 'react';
import LaunchRightComponent from './LaunchRightComponent';
import WaitRightComponent from './WaitRightComponent';

const LAUNCH = "launch";
const STAKING = "start";
const WAITING = "waiting";

class RightSection extends Component{

    constructor(props) {
        super(props);
    }

    render() {

        return (
            
            <section className = "rightSection">

            {this.props.currentState == LAUNCH && <LaunchRightComponent changeComponent={this.changeComponent}/>}
            {this.props.currentState == WAITING && <WaitRightComponent changeComponent={this.changeComponent}/>}



                {/* {this.props.currentState == "launch" && 
               
                }
                {this.props.currentState == "waiting" && 
                <div>Harami code</div>
                } */}

            </section>
            
            
        );
    }
}

export default RightSection;