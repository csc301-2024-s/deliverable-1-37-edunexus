// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {contextBridge, ipcRenderer} = require('electron');

// Add new channel to the validChannels arrays
let validChannels = ['loginData', 'signupData', 'request-report-generation', 'get-classes-by-teacher', 'get-datagrid-by-class', 'get-student', 'get-student-marks'];
let validReceiveChannels = ['loginResponse', 'signupResponse', 'report-generation-complete', 'report-generation-failed', 'classes-for-teacher', 'datagrid-for-class', 'get-student-response', 'get-student-marks-response'];

contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        if (validReceiveChannels.includes(channel)) {
            const listener = (event, ...args) => func(...args);
            ipcRenderer.on(channel, listener);

            return () => {
                ipcRenderer.removeListener(channel, listener);
            };
        } else {
            console.error(`Attempted to receive an invalid channel: ${channel}`);
        }
    }
});
