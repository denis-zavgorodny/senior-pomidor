export function save(state) {
    return {
        type: 'SAVE_OPTIONS',
        payload: state
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
