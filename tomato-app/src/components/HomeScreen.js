import React from "react";
import TimeLineCircle from "./TimeLineCircle";
import TimeLineSimple from "./TimeLineSimple";
import i18next from 'i18next';
import moment from "moment";

class HomeScreen extends React.Component {
    componentWillMount() {
        const { Options } = this.props;
        i18next.init({
            lng: Options.lang,
            resources: require(`../i18/${Options.lang}.json`)
        });
    }
    start(event) {
        if(this.props.Timer.working) {
            this.props.stopTimer();
        } else {
            this.props.runTimer();
        }
        event.preventDefault();
    }
    secondsToString(seconds) {
        let minutes = Math.floor(seconds / 60);
        let left = seconds % 60;
        if (left < 10) {
            left = `0${left}`;
        }
        return `${minutes}:${left}`;
    }
    render() {
        const { inInterval, working, timeline: { timeline } } = this.props.Timer;
        let buttonClass = working ? "working" : "stoped";
        buttonClass = `start-button ${buttonClass}`;
        let currentInterval = timeline[inInterval];
        let counter;
        const { skin } = this.props.Options;
        if (currentInterval) {
            counter = this.secondsToString(moment.unix(currentInterval.to).diff(moment(), 'seconds'));
        }
        let TimeLineHTML = null;
        if (skin === 'line') {
            TimeLineHTML = <TimeLineSimple {...this.props.Timer}></TimeLineSimple>;
        } else {
            TimeLineHTML = <TimeLineCircle {...this.props.Timer}></TimeLineCircle>;
        }
        return <div className={`main-screen ${skin}` }>
            {TimeLineHTML}
            <div className="start-button-wrapper"><a className={buttonClass} href="" onClick={this.start.bind(this)}><span>{this.props.Timer.working ? counter : i18next.t('start')}</span></a></div>
        </div>
    }
}

export default HomeScreen;
