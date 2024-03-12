// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('api', {
    // pingPong: (title) => ipcRenderer.send('ping-pong', title)

    send: (channel, data) => {
        let validChannels = ['loginData', 'signupData', 'request-report-generation', 'login-authentication'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ['loginResponse', 'signupResponse', 'report-generation-complete', 'report-generation-failed', 'login-failed', 'login-success'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});