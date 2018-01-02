import React from "react";
import PieChart from 'react-minimal-pie-chart';
import './TimeLine.css';

class TimeLine extends React.Component {

    render() {
        const { timeline: { timeline }, inInterval } = this.props;
        const chartConf = [];
        let totalChart = 0;
        timeline.map((el, index) => {
            totalChart += el.to - el.from;
            let alfa = inInterval === index ? 0.9 : 0.1;
            chartConf.push({
                value: el.to - el.from,
                key: index,
                color: el.type === 'INTERVAL' ? `RGBA(0,0,0,${alfa})` : `RGBA(255,0,0,${alfa})`
            });
        });
        return <div className='circle-chart'><PieChart
            startAngle={-90}
            totalValue={totalChart}
            lengthAngle={360}
            lineWidth={20}
            paddingAngle={3}
            data={chartConf}
        /></div>
        // return <div className='circle-chart'>
        //     <div className="chart-pie">{inInterval}</div>
        // </div>
    }
}

export default TimeLine;
