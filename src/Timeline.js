const moment = require('moment');

const defaultState = {
    lunch_from: "16:00",
    lunch_to: "17:00",
    interval: "30", // minutes
    break: "5", // minutes
    breakLong: "15", // minutes
    start: "10:00",
    breakLongPeriod: 4,
    end: "23:50",
    simpleTimer: false
};

module.exports = class Timeline {
    constructor(conf) {
        this.config = conf;
        this.dayStart = moment(conf.start, "HH:mm");
        this.dayEnd = moment(conf.end, "HH:mm");
        // ToDo
        // Подумать как тут определять мы еще до полуночи или после
        let _now = moment();
        if (this.dayEnd.isBefore(this.dayStart) && _now.isBefore(this.dayEnd)) {
            this.dayStart.subtract(1, 'days');
        } else if (this.dayEnd.isBefore(this.dayStart) && _now.isAfter(this.dayEnd)) {
            this.dayEnd.add(1, 'days');
        }
        this.lunchStart = moment(conf.lunch_from, "HH:mm");
        this.lunchEnd = moment(conf.lunch_to, "HH:mm");
        this.timeline = this.build();
    }
    build() {
        let next = this.dayStart;
        const timeline = [];
        var period = 1;
        while (next.isBefore(this.dayEnd)) {
            timeline.push({
                from: next.format('X'),
                to: next.add(this.config.interval, 'm').format('X'),
                type: "INTERVAL"
            });
            timeline.push({
                from: next.format('X'),
                to: next.add(period % this.config.breakLongPeriod === 0 ? this.config.breakLong : this.config.break, 'm').format('X'),
                type: period % this.config.breakLongPeriod === 0 ? "BREAKLONG" : "BREAK"
            });
            period++;
        }
        let last = timeline[timeline.length - 1];
        if (last.type === 'BREAKLONG' || last.type === 'BREAK') {
            timeline.splice(timeline.length - 1, 1);
        }
        return timeline;
    }
}
