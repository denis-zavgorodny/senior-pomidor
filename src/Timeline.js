const moment = require('moment');

const defaultState = {
    lunch_from: "16:00",
    lunch_to: "17:00",
    interval: "30", // minutes
    break: "5", // minutes
    breakLong: "15", // minutes
    start: "10:00",
    end: "23:50",
    simpleTimer: false
};

module.exports = class Timeline {
    constructor(conf) {
        this.config = conf;
        this.dayStart = moment(conf.start, "HH:mm");
        this.dayEnd = moment(conf.end, "HH:mm");
        this.lunchStart = moment(conf.lunch_from, "HH:mm");
        this.lunchEnd = moment(conf.lunch_to, "HH:mm");
        this.timeline = this.build();
    }
    build() {
        let next = this.dayStart;
        const timeline = [];
        while (next.isBefore(this.dayEnd)) {
            timeline.push({
                from: next.format('X'),
                to: next.add(this.config.interval, 'm').format('X')
            });
            next = next.add(this.config.break, 'm');
        }
        return timeline;
    }
}
