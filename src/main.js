const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const {generateReport} = require('./report/reportGenerator');
const db = require('./database/database');
const archiver = require('archiver');
const path = require('path');
const fs = require('fs');


const isDev = !app.isPackaged;

if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // eslint-disable-next-line no-undef
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // eslint-disable-next-line no-undef
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // if (isDev) {
    //     mainWindow.webContents.openDevTools();
    // }

};

ipcMain.on('save-data', async (event, data) => {
    try {
        for (const item of data) {

            if (!item.id) {
                continue;
            }

            const { id, studentName, test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11 } = item;

            const Student_ID = id;

            await db.saveStudentTestDataIfNotExists(Student_ID, studentName, test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11);
        }
        event.reply('save-data-response', { success: true });
    } catch (error) {
        console.error('Error saving data:', error);
        event.reply('save-data-response', { success: false, error: error.message });
    }
});

function createZipFromPDFs(pdfPaths, zipPath) {
    console.log('Creating zip: ', zipPath);
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
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
    });
}

function ensureDirectoryExists(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExists(dirname);
    fs.mkdirSync(dirname);
}

ipcMain.on('request-report-generation', async (event, selectedClass) => {
    try {
        console.log('Received report request for class starting with', selectedClass);

        const incrementedClass = parseInt(selectedClass) + 1; 

        const studentsData = await db.getStudentsTestDataByClass(incrementedClass.toString());

        if (studentsData.length === 0) {
            event.sender.send('report-generation-failed', 'No data found for selected class');
            return;
        }

        const pdfPaths = [];

        for (const studentDetails of studentsData) {
            let outputPath;
            if (studentsData.length === 1) {
                outputPath = path.join(isDev ? __dirname : process.resourcesPath, `student_${studentDetails.Student_ID}.pdf`);
            } else {
                outputPath = path.join(isDev ? __dirname : process.resourcesPath, `temp_report_${studentDetails.Student_ID}.pdf`);
            }
            const reportPath = await generateReport(studentDetails, outputPath);
            pdfPaths.push(reportPath);
        }

        if (pdfPaths.length === 1) {
            const singlePdfPath = pdfPaths[0];
            const newPdfPath = path.join(path.dirname(singlePdfPath), `student_${studentsData[0].Student_ID}.pdf`);
            fs.renameSync(singlePdfPath, newPdfPath);
            event.sender.send('report-generation-complete', newPdfPath);
        } else {
            const zipDirectory = path.join(__dirname, 'path', 'to', 'reports');
            const zipFileName = `class_${selectedClass}_reports_${Date.now()}.zip`;
            const zipPath = path.join(zipDirectory, zipFileName);

            ensureDirectoryExists(zipPath);

            await createZipFromPDFs(pdfPaths, zipPath);
            event.sender.send('report-generation-complete', zipPath);
        }
    } catch (error) {
        console.error('Error in report generation:', error);
        event.sender.send('report-generation-failed', error.message);
    }
});

ipcMain.on('load-sign-in', async (event, teacherId) => {
    var temp = db.getAllClass();
    console.log(temp);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});