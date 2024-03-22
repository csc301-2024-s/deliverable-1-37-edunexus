const {app, BrowserWindow, ipcMain} = require('electron');

// TODO: REPORT GENERATION IS BROKEN DUE TO SHARP DEPENDENCY
// Import for report generation - BROKEN
// const {generateReport} = require('./report/reportGenerator');
// const path = require('path');
// const fs = require('fs');

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



// TODO: The sharp package utilized causes issues during build
// ipcMain.on('request-report-generation', async (event, studentId) => {
//     try {
//         console.log('received report request');
//         const reportPath = await generateReport(studentId);
//
//         const {filePath} = await dialog.showSaveDialog({
//             buttonLabel: 'Save Report',
//             defaultPath: `report_${studentId}.pdf`,
//             filters: [
//                 {name: 'PDF Documents', extensions: ['pdf']}
//             ]
//         });
//
//         if (filePath) {
//             try {
//                 fs.copyFileSync(reportPath, filePath);
//                 fs.unlinkSync(reportPath);
//                 event.sender.send('report-generation-complete', filePath);
//             } catch (error) {
//                 console.error('Error moving the file:', error);
//                 event.sender.send('report-generation-failed', error.message);
//             }
//         } else {
//             event.sender.send('report-generation-cancelled');
//             fs.unlinkSync(reportPath);
//         }
//     } catch (error) {
//         console.error('Error generating report:', error);
//         event.sender.send('report-generation-failed', error.message);
//     }
// });

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

ipcMain.on('insert-student', async (event, student) => {
    try {
        const response = await db.insertStudent(student.name, student.studentNumber, student.age);
        console.log(response);
        event.sender.send('insert-student-response', response);
    } catch (error) {
        event.sender.send('insert-student-response', {error: error.message});
    }
});

ipcMain.on('insert-user', async (event, user) => {
    try {
        const response = await db.insertUser(user.username, user.password);
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
});

ipcMain.on('insert-class', async (event, classObject) => {
    try {
        const response = await db.insertClass(classObject.name, classObject.year, classObject.grade, classObject.teacherNumber, 1);
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
});

ipcMain.on('insert-teacher', async (event, teacher) => {
    try {
        const response = await db.insertTeacher(teacher.name, teacher.teacherNumber);
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
});