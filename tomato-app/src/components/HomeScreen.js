import React from "react";
import moment from "moment";

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
            let listClass = inInterval === index ? "active " : "";
            if(el.success === true) {
                listClass += "success ";
            }
            listClass += el.type;

            return <li key={index} className={listClass}><i className="timeline-from">{moment.unix(el.from).format("HH:mm")}</i><i className="timeline-to">{moment.unix(el.to).format("HH:mm")}</i></li>
        });
        let buttonClass = this.props.Timer.working ? "working" : "stoped";
        buttonClass = `start-button ${buttonClass}`;
        return <div className="main-screen">
            <div className="timeline-wrapper"><ul className="timeline">{timelineHTML}</ul></div>
            <div className="start-button-wrapper"><a className={buttonClass} href="" onClick={this.start.bind(this)}><span>{this.props.Timer.working ? "stop" : "start"}</span></a></div>
        </div>
    }
}

export default HomeScreen;
