import React from "react";
import moment from "moment";

class TimeLineSimple extends React.Component {

    render() {
        const { timeline: { timeline }, inInterval } = this.props;
        const timelineHTML = timeline.map((el, index) => {
            let listClass = inInterval === index ? "active " : "";
            if (el.success === true) {
                listClass += "success ";
            }
            listClass += el.type;

            return <li key={index} className={listClass}><i className="timeline-from">{moment.unix(el.from).format("HH:mm")}</i><i className="timeline-to">{moment.unix(el.to).format("HH:mm")}</i></li>
        });
        return <div className="timeline-wrapper"><ul className="timeline">{timelineHTML}</ul></div>
    }
}

export default TimeLineSimple;
