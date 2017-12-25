import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from "redux";
import persistState from 'redux-localstorage'
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import emmiterToElectron from './enhancers/emmiterToElectron';

let store;

if(process.env.NODE_ENV === 'development') {
    store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk, emmiterToElectron),
            persistState(),
            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
} else {
    store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk),
            persistState(),
        )
    );
}

if (window.ipcRenderer) {
    window.ipcRenderer.removeAllListeners('ON_INTERVAL');
    window.ipcRenderer.on('ON_INTERVAL', (event, inInterval, timeline) => {
        store.dispatch({
            type: 'SET_TIMELINE',
            payload: {inInterval, timeline}
        })
    });
}

ReactDOM.render(<Provider store={store}><BrowserRouter basename="/"><Routes /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
