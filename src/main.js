const {app, BrowserWindow, ipcMain} = require('electron');

// TODO: REPORT GENERATION IS BROKEN DUE TO SHARP DEPENDENCY
// Import for report generation - BROKEN
// const {generateReport} = require('./report/reportGenerator');
// const path = require('path');
// const fs = require('fs');

const isDev = !app.isPackaged;


const db = require('./database/database');


// Connect and initialize db
let dbPath = (isDev ? './edunexus.db' : process.resourcesPath + '/edunexus.db');
db.connectDB(dbPath);
db.initDB();

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

/**
 * Handles the 'get-classes-by-teacher' event to retrieve classes taught by a specific teacher.
 * @param {string} teacher_id - The ID of the teacher whose classes are being requested.
 * Logs the classes retrieved from the database and sends them back to the sender.
 * In case of an error, sends the error message back to the sender.
 */
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

ipcMain.on('login-authentication', async (event, data) => {
    const {username, password} = data;
    const loginSuccess = await db.checkUserPassword(username, password);

    if (loginSuccess) {
        const userInfo = await db.getUser(username);

        event.sender.send('login-success', {isAdmin: userInfo.admin, teacherId: userInfo.teacherNumber});
    } else {
        event.sender.send('login-failed');
    }
});

/**
 * Handles the 'get-datagrid-by-class' event to retrieve datagrid data for a specific class.
 * @param {string} class_id - The ID of the class for which the datagrid data is being requested.
 * Logs the datagrid data retrieved from the database and sends it back to the sender.
 * In case of an error, sends the error message back to the sender.
 */
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

/**
 * Handles the 'get-student' event to retrieve data for a specific student.
 * @param {string} studentNumber - The number of the student whose data is being requested.
 * Sends the retrieved student data back to the sender.
 * In case of an error, sends the error message back to the sender.
 */
ipcMain.on('get-student', async (event, studentNumber) => {
    // if (isDev) console.log(`received from frontend - get student ${studentNumber}`);

    try {
        const student = await db.getStudent(studentNumber);
        event.sender.send('get-student-response', student);
    } catch (error) {
        event.sender.send('get-student-response', {error: error.message});
    }
});

/**
 * Handles the 'get-student-marks' event to retrieve marks for a specific student.
 * @param {string} studentNumber - The number of the student whose marks are being requested.
 * Logs the retrieved marks and sends them back to the sender.
 * In case of an error, sends the error message back to the sender.
 */
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
        event.sender.send('insert-student-response', response);
    } catch (error) {
        event.sender.send('insert-student-response', {error: error.message});
    }
});

ipcMain.on('insert-user', async (event, user) => {
    try {
        const response = await db.insertUser(user.username, user.password, 0, 101);
        event.sender.send('insert-user-response', response);
    } catch (error) {
        event.sender.send('insert-user-response', {error: error.message});
    }
});

ipcMain.on('insert-class', async (event, classObject) => {
    try {
        const response = await db.insertClass(classObject.name, classObject.year, classObject.grade, classObject.teacherNumber, 1);
        event.sender.send('insert-class-response', response);
    } catch (error) {
        event.sender.send('insert-class-response', {error: error.message});
    }
});

ipcMain.on('insert-teacher', async (event, teacher) => {
    try {
        const response = await db.insertTeacher(teacher.name, teacher.teacherNumber);
        event.sender.send('insert-teacher-response', response);
    } catch (error) {
        event.sender.send('insert-teacher-response', {error: error.message});
    }
});

ipcMain.on('delete-student', async (event, student) => {
    try {
        const response = await db.deleteStudent(student.studentNumber);
        event.sender.send('delete-student-response', response);
    } catch (error) {
        event.sender.send('delete-student-response', {error: error.message});
    }
});

ipcMain.on('delete-user', async (event, user) => {
    try {
        const response = await db.deleteUser(user.username);
        event.sender.send('delete-user-response', response);
    } catch (error) {
        event.sender.send('delete-user-response', {error: error.message});
    }
});

ipcMain.on('delete-class', async (event, classObject) => {
    try {
        const response = await db.deleteClass(classObject.id);
        event.sender.send('delete-class-response', response);
    } catch (error) {
        event.sender.send('delete-class-response', {error: error.message});
    }
});

ipcMain.on('delete-teacher', async (event, teacher) => {
    try {
        const response = await db.deleteTeacher(teacher.teacherNumber);
        event.sender.send('delete-teacher-response', response);
    } catch (error) {
        event.sender.send('delete-teacher-response', {error: error.message});
    }
});


ipcMain.on('insert-student-to-class', async (event, classId, studentId) => {
    try {
        const response = await db.insertMark('__assign_class__', 100, studentId, classId);
        event.sender.send('insert-student-to-class-response', response);
    } catch (error) {
        event.sender.send('insert-student-to-class-response', {error: error.message});
    }
});