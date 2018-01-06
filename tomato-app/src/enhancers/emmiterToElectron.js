const emmiterToElectron = store => next => action => {
    if (action.type === 'RUN_TIMER' || action.type === 'STOP_TIMER' || action.type === 'SET_TIMER_PROXY') {
        if(window.ipcRenderer) {
            window.ipcRenderer.send(action.type, store.getState());
        }
    }
    return next(action);
}

export default emmiterToElectron;
