import React from "react";

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
        const {timeline: {timeline}, inInterval} = this.props.Timer;
        const timelineHTML = timeline.map((el, index) => {
            let listClass = inInterval === index ? "active" : "";

            return <li key={index} className={listClass}>{el.from} - {el.to}</li>
        });
        let buttonClass = this.props.Timer.working ? "working" : "stoped";
        buttonClass = `start-button ${buttonClass}`;
        return <div className="main-screen">
            <ul className="timeline">{timelineHTML}</ul>
            <a className={buttonClass} href="" onClick={this.start.bind(this)}><span>{this.props.Timer.working ? "stop" : "start"}</span></a>
        </div>
    }
}

export default HomeScreen;
