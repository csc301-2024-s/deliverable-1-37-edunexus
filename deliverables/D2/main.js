const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

console.log("Starting app...");
function handleSignupData(event, data) {
  console.log('Received signup data:', data);
}

function createWindow () {
  console.log("Creating main window...");
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')      
    }
  });

  ipcMain.on('signupData', (event, data) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.send(data)
  })

  mainWindow.loadFile('login.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  ipcMain.on('signupData', handleSignupData);
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

