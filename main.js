const { app, BrowserWindow, ipcRenderer, ipcMain, Notification} = require('electron');
const path = require('path');
const url = require('url');
const Timeline = require('./src/Timeline');
const EventEmitter = require('events');
const i18next = require('./tomato-app/node_modules/i18next');

const emitter = new EventEmitter();
let win;

function createWindow () {
    // Создаёт окно браузера.
    win = new BrowserWindow({
        backgroundColor: '#2e2c29',
        title: 'Senior pomidor',
        width: 400,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        }
    });

    // и загрузит index.html приложение.
    win.loadURL(url.format({
        // pathname: process.env.NODE_ENV === 'development' ? 'localhost:3000/' : path.join(__dirname, 'tomato-app/build/index.html'),
        // protocol: process.env.NODE_ENV === 'development' ? 'http:' : 'file:',
        pathname: 'localhost:3000/',
        protocol: 'http:',
        slashes: true
    }));


    // Откроет DevTools.
    // win.webContents.openDevTools();

    // Возникает, когда окно будет закрыто.
    win.on('closed', () => {
        // Разбирает объект окна, обычно вы можете хранить окна
        // в массиве, если ваше приложение поддерживает несколько окон в это время,
        // тогда вы должны удалить соответствующий элемент.
        win = null;
    });
}

// Этот метод будет вызываться, когда Electron закончит
// инициализацию и готова к созданию окон браузера.
// Некоторые интерфейсы API могут использоваться только после возникновения этого события.
app.on('ready', createWindow);

// Выйти, когда все окна будут закрыты.
app.on('window-all-closed', () => {
    // На macOS это обычно для приложений и их строки меню
    // оставаться активным до тех пор, пока пользователь не выйдет явно с помощью Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // На MacOS это общее для того чтобы создать окно в приложении, когда значок
    // dock нажали и нет других открытых окон.
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


// В этом файле вы можете включить код другого основного процесса
// вашего приложения. Можно также поместить их в отдельные файлы и применить к ним require.
