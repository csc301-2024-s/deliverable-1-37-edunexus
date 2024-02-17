const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { insertUser, createUsersTable, verifyUser, getUserByEmail } = require('./database.js');
const { generateReport } = require('./reportGenerator');
const path = require('path');
const fs = require('fs');



let mainWindow;

ipcMain.on('signupData', handleSignupData);

console.log("Starting app...");
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

  ipcMain.on('loginData', async (event, args) => {
    try {
        const user = await verifyUser(args.email, args.password);
        if (user) {
          const safeUser = { id: user.id, name: user.name, email: user.email };
          event.reply('loginResponse', { success: true, user: safeUser });
        } else {
          event.reply('loginResponse', { success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        event.reply('loginResponse', { success: false, error: error.message });
    }
});

  mainWindow.loadFile('login.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function handleSignupData(event, args) {
  saveUserDataToDatabase(args.username, args.email, args.password)
    .then(result => {
      event.reply('signupResponse', result);
    })
    .catch(error => {
      event.reply('signupResponse', { success: false, error: error.message });
    });
}

async function initializeDatabase() {
  try {
    await createUsersTable();
    console.log('Users table is ready.');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
}

async function saveUserDataToDatabase(username, email, password) {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { success: false, error: 'Email already in use' };
    }

    const userId = await insertUser(username, email, password);
    return { success: true, userId };
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      return { success: false, error: 'Email already in use' };
    }
    return { success: false, error: error.message };
  }
}

ipcMain.on('request-report-generation', async (event, studentId) => {
  try {

    const reportPath = await generateReport(studentId);

    const { filePath } = await dialog.showSaveDialog({
      buttonLabel: 'Save Report',
      defaultPath: `report_${studentId}.pdf`,
      filters: [
        { name: 'PDF Documents', extensions: ['pdf'] }
      ]
    });

    if (filePath) {
      try {
        fs.copyFileSync(reportPath, filePath);
        fs.unlinkSync(reportPath);
        event.sender.send('report-generation-complete', filePath);
      } catch (error) {
        console.error('Error moving the file:', error);
        event.sender.send('report-generation-failed', error.message);
      }
    } else {
      event.sender.send('report-generation-cancelled');
      fs.unlinkSync(reportPath);
    }
  } catch (error) {
    console.error('Error generating report:', error);
    event.sender.send('report-generation-failed', error.message);
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await initializeDatabase();
    createWindow();
  }
});