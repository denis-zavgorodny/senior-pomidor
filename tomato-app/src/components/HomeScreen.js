import React from "react";
import TimeLineCircle from "./TimeLineCircle";
import TimeLineSimple from "./TimeLineSimple";

class HomeScreen extends React.Component {
    start(event) {
        if(this.props.Timer.working) {
            this.props.stopTimer();
        } else {
            this.props.runTimer();
        }
        event.preventDefault();
    }
    render() {
        let buttonClass = this.props.Timer.working ? "working" : "stoped";
        buttonClass = `start-button ${buttonClass}`;
        let TimeLineHTML = null;
        if (this.props.Options.skin === 'line') {
            TimeLineHTML = <TimeLineSimple {...this.props.Timer}></TimeLineSimple>;
        } else {
            TimeLineHTML = <TimeLineCircle {...this.props.Timer}></TimeLineCircle>;
        }
        return <div className="main-screen">
            {TimeLineHTML}
            <div className="start-button-wrapper"><a className={buttonClass} href="" onClick={this.start.bind(this)}><span>{this.props.Timer.working ? "stop" : "start"}</span></a></div>
        </div>
    }
}

export default HomeScreen;
