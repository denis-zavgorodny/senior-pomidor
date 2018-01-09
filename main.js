const { app, BrowserWindow, ipcRenderer, ipcMain, Notification, protocol, Tray, nativeImage, Menu } = require('electron');
const path = require('path');
const url = require('url');
const http = require('http');
const finalhandler = require('finalhandler');
const Timeline = require('./src/Timeline');
const counter = require('./src/Counter');
const EventEmitter = require('events');
const i18next = require('i18next');
const serveStatic = require('serve-static');

const _port = 3033;

const emitter = new EventEmitter();
let win;
let tray;
const image = nativeImage.createFromPath(path.join(__dirname, '/assets/16.png'));
const image_na = nativeImage.createFromPath(path.join(__dirname, '/assets/16-na.png'));
let tray_icons = [];
tray_icons['INTERVAL'] = nativeImage.createFromPath(path.join(__dirname, '/assets/16.png'));
tray_icons['BREAK'] = nativeImage.createFromPath(path.join(__dirname, '/assets/16-pause.png'));
tray_icons['BREAKLONG'] = nativeImage.createFromPath(path.join(__dirname, '/assets/16-pause.png'));
tray_icons['LUNCH'] = nativeImage.createFromPath(path.join(__dirname, '/assets/16-pause.png'));

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
        pathname: process.env.NODE_ENV === 'development' ? 'localhost:3000/' : `localhost:${_port}/build/index.html`,
        protocol: process.env.NODE_ENV === 'development' ? 'http:' : 'http:',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', () => {
    if (process.env.NODE_ENV !== 'development') {
        var serve = serveStatic(path.join(__dirname, 'tomato-app/'), { 'index': ['build/index.html', 'build/index.htm'] });
        var server = http.createServer(function onRequest(req, res) {
            serve(req, res, finalhandler(req, res));
        });
        server.listen(_port);
    }

    tray = new Tray(image_na);
    tray.setHighlightMode('never');
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Quit', type: 'normal', role: 'quit' }
    ])
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
    createWindow();
});

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
    if (tray) {
        tray.setImage(image);
    }
    emitter.emit('RUN_TIMER_PROXY', store);
});
ipcMain.on('STOP_TIMER', (event, store) => {
    if (tray) {
        tray.setTitle(i18next.t(''));
        tray.setImage(image_na);
    }
    clearInterval(pomodoroInterval);
});
ipcMain.on('SET_TIMER_PROXY', (event, store) => {
    emitter.emit('STOP_TIMER_PROXY', store);
});


emitter.on('STOP_TIMER_PROXY', (store) => {
    tray.setTitle(i18next.t(''));
    tray.setImage(image_na);
    clearInterval(pomodoroInterval);
    let timeline = new Timeline(store.Options);
    if (win) {
        win.webContents.send('ON_INTERVAL', null, timeline);
    }
});
emitter.on('RUN_TIMER_PROXY', (store) => {
    const { Options, Timer } = store;
    let timeline = new Timeline(Options);
    let lastState = null;
    pomodoroInterval = setInterval(() => {
        let currentState = null;
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
            tray.setImage(tray_icons[currentState]);
            if (Notification.isSupported()) {
                let notify;
                if (currentState) {
                    notify = new Notification({
                        title: i18next.t(`${currentState}_TITLE`),
                        body: i18next.t(`${currentState}_TEXT`)
                    });
                } else {
                    notify = new Notification({
                        title: i18next.t('STOP_TITLE'),
                        body: i18next.t('STOP_TEXT')
                    });
                }

                notify.show();
            }
        }
        if (tray) {
            tray.setTitle(counter(timeline.timeline, inInterval));
        }

        if (!currentState) {
            emitter.emit('STOP_TIMER_PROXY', store);
        }
        lastState = currentState;
    }, 500);
});
