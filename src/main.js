const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const {generateReport} = require('./report/reportGenerator');
const db = require('./database/database');
const archiver = require('archiver');
const path = require('path');
const fs = require('fs');


const isDev = !app.isPackaged;


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

    mainWindow.maximize();

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

/**
 * This function creates a zip file from a list of PDF files.
 * @param {Array} pdfPaths - The paths of the PDF files to be zipped.
 * @param {string} zipPath - The path where the zip file will be saved.
 * @returns {Promise} - A promise that resolves when the zip file is created.
 */
function createZipFromPDFs(pdfPaths, zipPath) {
    console.log('Creating zip: ', zipPath);
    return new Promise((resolve, reject) => {
        dialog.showSaveDialog({
            title: 'Save Student Report',
            defaultPath: zipPath,
            filters: [
                { 
                    name: 'Zip Files', 
                    extensions: ['zip'] 
                }
            ]
        }).then(result => {
            if (!result.canceled) {
                const output = fs.createWriteStream(result.filePath);
                const archive = archiver('zip', {
                    zlib: { level: 9 }
                });

                output.on('close', function() {
                    console.log(archive.pointer() + ' total bytes');
                    console.log('Archiver has been finalized and the output file descriptor has closed.');
                    resolve();
                });

                archive.on('error', function(err) {
                    reject(err);
                });

                archive.pipe(output);

                pdfPaths.forEach(pdfPath => {
                    archive.file(pdfPath, { name: path.basename(pdfPath) });
                });

                archive.finalize();
            } else {
                reject(new Error('User cancelled the save dialog'));
            }
        }).catch(err => {
            console.error('Failed to show save dialog', err);
            reject(err);
        });
    });
}

/**
 * This function ensures that a directory exists.
 * If the directory does not exist, it will be created.
 * @param {string} filePath - The path of the directory to be ensured.
 */
function ensureDirectoryExists(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExists(dirname);
    fs.mkdirSync(dirname);
}

/**
 * This is a docstring. It provides a description of the function or code block.
 * In this case, it's used to describe the purpose of the code block below.
 * The code block below listens for the 'request-report-generation' event from the renderer process.
 * It then generates a report for the selected student and sends the report path back to the renderer process.
 */
ipcMain.on(
    'request-report-generation',
    async (event, dataWithClassName) => {

        try {

            if (dataWithClassName.length === 0) {
                event.sender.send('report-generation-failed', 'No data found for selected class');
                return;
            }

            const pdfPaths = [];

            for (const studentDetails of dataWithClassName) {
                let outputPath;

                if (dataWithClassName.length === 1) {
                    outputPath = path.join(isDev ? __dirname : process.resourcesPath, `student_${studentDetails.id}.pdf`);
                } else {
                    outputPath = path.join(isDev ? __dirname : process.resourcesPath, `student_id_${studentDetails.id}.pdf`);
                }

                const reportPath = await generateReport(
                    studentDetails,
                    outputPath
                );

                pdfPaths.push(reportPath);
            }

            const zipDirectory = path.join(isDev ? __dirname : process.resourcesPath, 'path', 'to', 'reports');
            const zipFileName = 'reports.zip';
            const zipPath = path.join(zipDirectory, zipFileName);

            ensureDirectoryExists(zipPath);

            await createZipFromPDFs(pdfPaths, zipPath);
            event.sender.send('report-generation-complete', zipPath);
            
        } catch (error) {
            console.error('Error in report generation:', error);
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
        const teacherInfo = await db.getTeacher(userInfo.teacherNumber);

        console.log(teacherInfo);

        event.sender.send('login-success', {isAdmin: userInfo.admin, teacherId: userInfo.teacherNumber, teacherName: teacherInfo['name']});
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


// Used to update the row of a student in the database
ipcMain.on('update-row', async (event, row_data) => {
    try {
        await db.updateRow(row_data);
    } catch (error) {
        event.sender.send('update-row-response', {error: error.message});
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
        const response = await db.insertUser(user.username, user.password, 0, user.newTeacherId);

        try {
            await db.insertTeacher(user.teacherName, user.newTeacherId);
            event.sender.send('insert-user-response', response);
        } catch (error_2) {
            event.sender.send('insert-user-response', {error: error_2.message});
        }
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


ipcMain.on('insert-student-to-class', async (event, info) => {
    try {
        const response = await db.insertMark('__assign_class__', 100, parseInt(info.studentId), parseInt(info.classId));
        console.log(response);
        event.sender.send('insert-student-to-class-response', response);
    } catch (error) {
        event.sender.send('insert-student-to-class-response', {error: error.message});
    }
});