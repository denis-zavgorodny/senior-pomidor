const opt = {
    intervalNames: {
        INTERVAL: "INTERVAL",
        BREAK: "BREAK",
        BREAKLONG: "BREAKLONG",
        LUNCH: "LUNCH",
    },
    helpers: {
        isBreak: (str) => {
            return str === opt.intervalNames.BREAK || str === opt.intervalNames.BREAKLONG
        }
    }
}

module.exports = opt;
