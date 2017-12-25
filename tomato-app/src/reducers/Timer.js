const defaultState = {
    timeline: {
        timeline: []
    }
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case "RUN_TIMER":
            return { ...state, working: true };
        case "STOP_TIMER":
            return { ...state, working: false };
        case "SET_TIMELINE":
            return { ...state, timeline: action.payload.timeline, inInterval: action.payload.inInterval};
        default:
            return state;
    }
}
