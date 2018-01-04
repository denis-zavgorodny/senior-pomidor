const { app, BrowserWindow, ipcRenderer, ipcMain, Notification} = require('electron');
const path = require('path');
const url = require('url');
const Timeline = require('./src/Timeline');
const EventEmitter = require('events');
const i18next = require('i18next');

const emitter = new EventEmitter();
let win;

function createWindow () {
    win = new BrowserWindow({
        backgroundColor: '#2e2c29',
        title: 'Senior pomodoro',
        width: 400,
        height: 400,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js'
        },
        icon: path.join(__dirname, '/assets/icon.png'),
    });

    win.loadURL(url.format({
        // pathname: process.env.NODE_ENV === 'development' ? 'localhost:3000/' : path.join(__dirname, 'tomato-app/build/index.html'),
        // protocol: process.env.NODE_ENV === 'development' ? 'http:' : 'file:',
        pathname: 'localhost:3000/',
        protocol: 'http:',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})
let pomodoroInterval;
ipcMain.on('RUN_TIMER', (event, store) => {
    emitter.emit('RUN_TIMER_PROXY', store);

});
ipcMain.on('STOP_TIMER', (event, store) => {
    clearInterval(pomodoroInterval);
    let timeline = new Timeline(store.Options);
    if (win) {
        win.webContents.send('ON_INTERVAL', null, timeline);
    }
});

emitter.on('RUN_TIMER_PROXY', (store) => {
    const { Options, Timer } = store;
    let timeline = new Timeline(Options);
    let lastState, currentState;
    pomodoroInterval = setInterval(() => {
        let now = Math.round(new Date().getTime() / 1000);
        let inInterval = timeline.timeline.reduce((acc, el, index) => {
            if (acc === null) return now >= el.from && now <= el.to ? index : null;
            return acc;
        }, null);
        if (win) {
            win.webContents.send('ON_INTERVAL', inInterval, timeline);
        }
        if (timeline.timeline[inInterval]) {
            currentState = timeline.timeline[inInterval].type;
        }
        i18next.init({
            lng: Options.lang,
            resources: require(`./tomato-app/src/i18/${Options.lang}.json`)
        });
        if (lastState !== currentState) {
            if (Notification.isSupported()) {
                let notify = new Notification({
                    title: i18next.t(`${currentState}_TITLE`),
                    body: i18next.t(`${currentState}_TEXT`)
                });
                notify.show();
            }
        }
        lastState = currentState;
    }, 500);
});
