export function save(state) {
    return (dispatch) => {
        dispatch({
            type: 'SAVE_OPTIONS',
            payload: state
        });
        dispatch({
            type: 'SET_TIMER_PROXY',
            payload: state
        });
    }
}

export function changeLanguage(langFunction) {
    return dispatch => {
        dispatch({
            type: 'CHANGE_LANGUAGE',
            payload: {
                language: langFunction
            }
        });
    }
}
