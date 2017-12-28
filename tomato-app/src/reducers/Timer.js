const defaultState = {
    inInterval: 2,
    timeline: {
        timeline: [
            // {
            //     from: 0,
            //     to: 1,
            //     success: true,
            //     type: "INTERVAL"
            // },
            // {
            //     from: 2,
            //     to: 3,
            //     success: true,
            //     type: "INTERVAL"
            // },
            // {
            //     from: 4,
            //     to: 5,
            //     success: false,
            //     type: "INTERVAL"
            // },
            // {
            //     from: 6,
            //     to: 7,
            //     success: false,
            //     type: "INTERVAL"
            // },
            // {
            //     from: 8,
            //     to: 9,
            //     success: false,
            //     type: "INTERVAL"
            // },
            // {
            //     from: 10,
            //     to: 11,
            //     success: false,
            //     type: "INTERVAL"
            // },
            // {
            //     from: 10,
            //     to: 11,
            //     success: false,
            //     type: "INTERVAL"
            // },
            // {
            //     from: 10,
            //     to: 11,
            //     success: false,
            //     type: "INTERVAL"
            // },
            // {
            //     from: 10,
            //     to: 11,
            //     success: false,
            //     type: "INTERVAL"
            // },
            // {
            //     from: 10,
            //     to: 11,
            //     success: false,
            //     type: "INTERVAL"
            // }

        ]
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
