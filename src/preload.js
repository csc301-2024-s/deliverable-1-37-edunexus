const { contextBridge, ipcRenderer } = require('electron');


let validChannels = [
    'loginData',
    'signupData',
    'request-report-generation',
    'get-classes-by-teacher',
    'get-datagrid-by-class',
    'get-student',
    'get-student-marks',
    'login-authentication'
];

let validReceiveChannels = [
    'loginResponse',
    'signupResponse',
    'report-generation-complete',
    'report-generation-failed',
    'classes-for-teacher',
    'datagrid-for-class',
    'get-student-response',
    'get-student-marks-response',
    'login-failed',
    'login-success'
];

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

            // Return a function to allow removal of the event listener
            return () => {
                ipcRenderer.removeListener(channel, listener);
            };
        } else {
            console.error(`Attempted to receive an invalid channel: ${channel}`);
        }
    }
});
