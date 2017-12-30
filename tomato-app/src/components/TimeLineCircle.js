import React from "react";
import './TimeLine.css';

class TimeLine extends React.Component {

    render() {
        const { timeline: { timeline }, inInterval } = this.props;
        console.log(timeline);
        return <div className='circle-chart'>
            <div className="chart-pie">{inInterval}</div>
        </div>
    }
}

export default TimeLine;
