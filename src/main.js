const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const {generateReport} = require('./report/reportGenerator');
const db = require('./database/database');
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

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

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