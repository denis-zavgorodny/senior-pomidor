const moment = require('moment');

function secondsToString(seconds) {
    let minutes = Math.floor(seconds / 60);
    let left = seconds % 60;
    if (left < 10) {
        left = `0${left}`;
    }
    return `${minutes}:${left}`;
}

module.exports = (timeline, inInterval) => {
    let currentInterval = timeline[inInterval];
    let counter;
    if (currentInterval) {
        return secondsToString(moment.unix(currentInterval.to).diff(moment(), 'seconds'));
    }
    return '';
};

