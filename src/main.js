const {app, BrowserWindow, ipcMain, dialog} = require('electron');

// Import for report generation
const {generateReport} = require('./report/reportGenerator');
// const path = require('path');
const fs = require('fs');

// const path = require('path');

const { getAllClass } = require('./database/database');
// For login authentication
const { checkUserPassword } = require('./database/database');

const isDev = !app.isPackaged;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // eslint-disable-next-line no-undef
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // and load the index.html of the app.
    // eslint-disable-next-line no-undef
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);
app.whenReady().then(() => {
    createWindow();
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


ipcMain.on('request-report-generation', async (event, studentId) => {
    try {
        console.log('received report request');
        const reportPath = await generateReport(studentId);

        const {filePath} = await dialog.showSaveDialog({
            buttonLabel: 'Save Report',
            defaultPath: `report_${studentId}.pdf`,
            filters: [
                {name: 'PDF Documents', extensions: ['pdf']}
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

ipcMain.on('load-sign-in', async (event, teacherId) => {
    var temp = getAllClass();
    console.log(temp);
});

ipcMain.on('login-authentication', async (event, data) => {
    const {username, password} = data;
    const loginSuccess = await checkUserPassword(username, password);

    if (loginSuccess) {
        event.sender.send('login-success');
    } else {
        event.sender.send('login-failed');
    }
});

// function handleSignupData(event, args) {
//     saveUserDataToDatabase(args.username, args.email, args.password)
//         .then(result => {
//             event.reply('signupResponse', result);
//         })
//         .catch(error => {
//             event.reply('signupResponse', {success: false, error: error.message});
//         });
// }

// OTHER IMPLEMENTATIONS
// ---------------------------------------------------------------------------


// let mainWindow;

// ipcMain.on('signupData', handleSignupData);

//   ipcMain.on('loginData', async (event, args) => {
//     try {
//         const user = await verifyUser(args.email, args.password);
//         if (user) {
//           const safeUser = { id: user.id, name: user.name, email: user.email };
//           event.reply('loginResponse', { success: true, user: safeUser });
//         } else {
//           event.reply('loginResponse', { success: false, error: 'Invalid credentials' });
//         }
//     } catch (error) {
//         event.reply('loginResponse', { success: false, error: error.message });
//     }


// Set for delete
//
// async function initializeDatabase() {
//   try {
//     await createUsersTable();
//     console.log('Users table is ready.');
//   } catch (error) {
//     console.error('Error creating users table:', error);
//   }
// }

// async function saveUserDataToDatabase(username, email, password) {
//   try {
//     const existingUser = await getUserByEmail(email);
//     if (existingUser) {
//       return { success: false, error: 'Email already in use' };
//     }

//     const userId = await insertUser(username, email, password);
//     return { success: true, userId };
//   } catch (error) {
//     if (error.code === 'SQLITE_CONSTRAINT') {
//       return { success: false, error: 'Email already in use' };
//     }
//     return { success: false, error: error.message };
//   }
// }
