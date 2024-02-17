const { app, BrowserWindow, Menu, ipcMain } = require('electron/main')
const path = require('node:path')
const { insertUser, getUserbyUsername, checkLogin } = require('./database.js')

async function checkUsername (event, username) {
  const webContents = event.sender
  try {
    const existingUser = await getUserbyUsername(username)
    if (existingUser) {
      webContents.send('userResponse', [true, 'Username found'])
      return { success: true };
    }
    webContents.send('userResponse', [false, 'Username not found'])
    return { success: false, error: 'Username not found' };
  } catch (error) {
    webContents.send('userResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message };
  }
}

async function createUser (event, username, password) {
  const webContents = event.sender
  try {
    const existingUser = await getUserbyUsername(username);
    if (existingUser) {
      webContents.send('userResponse', [false, 'Username already in use'])
      return { success: false, error: 'Username already in use' };
    }

    const userId = await insertUser(username, password);
    webContents.send('userResponse', [true, 'User successfully created with id' + userId])
    return { success: true, userId };
  } catch (error) {
    webContents.send('userResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message };
  }
}

async function login (event, username, password) {
  const webContents = event.sender
  try {
    const existingUser = await checkLogin(username, password)
    if (existingUser) {
      webContents.send('userResponse', [true, 'Login successful'])
      return { success: true };
    }
    webContents.send('userResponse', [false, 'Username or password is incorrect'])
    return { success: false, error: 'Username not found' };
  } catch (error) {
    webContents.send('userResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message };
  }
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  // ipcMain.handle('createUser', createUser)
  // ipcMain.handle('checkUsername', checkUsername)
  ipcMain.on('createUser', createUser)
  ipcMain.on('checkUsername', checkUsername)
  ipcMain.on('login', login)

  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})