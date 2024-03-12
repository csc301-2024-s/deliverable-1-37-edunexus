const {contextBridge, ipcRenderer} = require('electron');


contextBridge.exposeInMainWorld('api', {

    send: (channel, data) => {
        let validChannels = [
            'loginData',
            'signupData',
            'request-report-generation',
            'save-data'
        ];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = [
            'loginResponse',
            'signupResponse',
            'report-generation-complete',
            'report-generation-failed',
            'save-data-response'
        ];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});