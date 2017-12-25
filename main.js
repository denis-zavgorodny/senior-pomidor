const { app, BrowserWindow, ipcRenderer, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const Timeline = require('./src/Timeline');

// Храните глобальную ссылку на объект окна, если вы этого не сделаете, окно будет
// автоматически закрываться, когда объект JavaScript собирает мусор.
let win;

function createWindow () {
    // Создаёт окно браузера.
    win = new BrowserWindow({
        width: 900,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        }
    });

    // и загрузит index.html приложение.
    win.loadURL(url.format({
        pathname: process.env.NODE_ENV === 'development' ? 'localhost:3000/' : path.join(__dirname, 'tomato-app/build/index.html'),
        protocol: process.env.NODE_ENV === 'development' ? 'http:' : 'file:',
        slashes: true
    }));


    // Откроет DevTools.
    win.webContents.openDevTools();

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
    let timeline = new Timeline(store.Options);
    pomodoroInterval = setInterval(() => {
        let now = new Date().getTime() / 1000;
        let inInterval = timeline.timeline.reduce((acc, el, index) => {
            if (acc === null) return now >= el.from && now <= el.to ? index : false;
            return acc;
        }, null);
        event.sender.send('ON_INTERVAL', inInterval, timeline);

    }, 1000);
});
ipcMain.on('STOP_TIMER', (event, store) => {
    clearInterval(pomodoroInterval);
})

// В этом файле вы можете включить код другого основного процесса
// вашего приложения. Можно также поместить их в отдельные файлы и применить к ним require.
