const { app, BrowserWindow } = require('electron');
const path = require('path');

const startUrl = path.resolve('html/index.html');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 625,
    minWidth: 100,
    minHeight: 100,
    x: 200,
    y: 100,
    frame: false,
    icon: path.join(__dirname, 'ros.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(startUrl);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
