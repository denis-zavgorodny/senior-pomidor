const defaultState = {
    lunch_from: "16:00",
    lunch_to:  "17:00",
    interval: 30, // minutes
    break: 5, // minutes
    breakLong: 15, // minutes
    breakLongPeriod: 4, // minutes
    start: "10:00",
    end: "19:00",
    simpleTimer: false
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case '@@redux/INIT':
            return state;
        case "SAVE_OPTIONS":
            return Object.assign(state, action.payload);
        default:
            return state;
    }
}
