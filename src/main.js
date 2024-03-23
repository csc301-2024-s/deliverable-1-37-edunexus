const {app, BrowserWindow, ipcMain, dialog} = require('electron');

// TODO: REPORT GENERATION IS BROKEN DUE TO SHARP DEPENDENCY
// Import for report generation - BROKEN
// const {generateReport} = require('./report/reportGenerator');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const isDev = !app.isPackaged;

const db = require('./database/database');

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
            contextIsolation: true,
            nodeIntegration: false,
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
    console.log('App is ready, setting up read-excel-file IPC listener');
    ipcMain.on('read-excel-file', (event, filePath) => {

        console.log('main filepath:', filePath);
    
        try {
            const workbook = XLSX.readFile(filePath);
            console.log('main workbook', workbook);
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            event.reply('excel-file-data', data);
        } catch (error) {
            console.error('Error reading Excel file:', error);
            event.reply('excel-file-error', error.message);
        }
    });

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

ipcMain.on('read-file', (event, filePath) => {
    const fullPath = path.join(app.getPath('downloads'), filePath);
    fs.readFile(fullPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read file:', err);
            event.sender.send('file-read-error', err.message);
            return;
        }
        event.sender.send('file-content', data);
    });
});

console.log('Setting up read-excel-file IPC listener');
// ipcMain.on('read-excel-file', (event, filePath) => {

//     console.log('main filepath:', filePath);

//     try {
//         const workbook = XLSX.readFile(filePath);
//         console.log('main workbook', workbook);
//         const firstSheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[firstSheetName];
//         const data = XLSX.utils.sheet_to_json(worksheet);
//         event.reply('excel-file-data', data);
//     } catch (error) {
//         console.error('Error reading Excel file:', error);
//         event.reply('excel-file-error', error.message);
//     }
// });

ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'Spreadsheets', extensions: ['xlsx'] }
        ]
    }).then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
            event.sender.send('selected-file', result.filePaths[0]);
        }
    }).catch(err => {
        console.log(err);
    });
});

ipcMain.on('save-marks-to-db', async (event, marksToInsert) => {
    for (const {name, mark, studentNumber, classID} of marksToInsert) {
        console.log(name, mark, studentNumber, classID);
        try {
            await db.insertMark(name, mark, studentNumber, classID);
        } catch (error) {
            console.error('Error saving data to the database:', error);
            event.sender.send('save-marks-to-db-response', {error: error.message});
            break;
        }
    }
    event.sender.send('save-marks-to-db-response', {success: true});
});

// TODO: The sharp package utilized causes issues during build
ipcMain.on('request-report-generation', async (event, studentId) => {
    try {
        console.log('received report request for student: ', studentId);
        // const reportPath = await generateReport(studentId);

        // const {filePath} = await dialog.showSaveDialog({
        //     buttonLabel: 'Save Report',
        //     defaultPath: `report_${studentId}.pdf`,
        //     filters: [
        //         {name: 'PDF Documents', extensions: ['pdf']}
        //     ]
        // });

        // if (filePath) {
        //     try {
        //         fs.copyFileSync(reportPath, filePath);
        //         fs.unlinkSync(reportPath);
        //         event.sender.send('report-generation-complete', filePath);
        //     } catch (error) {
        //         console.error('Error moving the file:', error);
        //         event.sender.send('report-generation-failed', error.message);
        //     }
        // } else {
        //     event.sender.send('report-generation-cancelled');
        //     fs.unlinkSync(reportPath);
        // }
    } catch (error) {
        console.error('Error generating report:', error);
        event.sender.send('report-generation-failed', error.message);
    }
});

ipcMain.on('get-classes-by-teacher', async (event, teacher_id) => {
    if (isDev) console.log('received from frontend ' + teacher_id);
    try {
        const classes = await db.getAllClass();
        console.log('classes = ' + classes);
        const classesForTeacher = classes
            .filter(cls => cls.teacherNumber === teacher_id)
            .map(cls => ({ id: cls.id, name: cls.name }));

        event.sender.send('classes-for-teacher', classesForTeacher);
    } catch (error) {
        event.sender.send('classes-for-teacher', { error: error.message });
    }
});

ipcMain.on('get-datagrid-by-class', async (event, class_id) => {
    if (isDev) console.log(`received from frontend - datagrid for class ${class_id}`);

    try {
        const datagrid_items = await db.getStudentAndMarkByClass(class_id);
        try {
            const datagrid_columns = await db.getMarkNameByClass(class_id);

            console.log({columns: datagrid_columns, items: datagrid_items});

            event.sender.send('datagrid-for-class', {columns: datagrid_columns, items: datagrid_items});
        } catch (error) {
            event.sender.send('datagrid-for-class', {error: error.message});
        }
    } catch (error) {
        event.sender.send('datagrid-for-class', {error: error.message});
    }
});

ipcMain.on('get-student', async (event, studentNumber) => {
    // if (isDev) console.log(`received from frontend - get student ${studentNumber}`);

    try {
        const student = await db.getStudent(studentNumber);
        event.sender.send('get-student-response', student);
    } catch (error) {
        event.sender.send('get-student-response', {error: error.message});
    }
});

ipcMain.on('get-student-marks', async (event, studentNumber) => {
    if (isDev) console.log(`received from frontend - get student marks ${studentNumber}`);

    try {
        const marks = await db.getStudentMark(studentNumber);
        // console.log('marks = ' + marks);
        console.log(marks);
        event.sender.send('get-student-marks-response', marks);
    } catch (error) {
        event.sender.send('get-student-marks-response', {error: error.message});
    }
});
