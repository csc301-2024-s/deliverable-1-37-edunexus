const { contextBridge, ipcRenderer } = require('electron');

// Define the channels that can be used for sending and receiving messages
// to ensure that only valid channels are used for IPC (Inter-Process Communication).
let validChannels = [
    'loginData',
    'signupData',
    'request-report-generation',
    'get-classes-by-teacher',
    'get-datagrid-by-class',
    'get-student',
    'get-student-marks',
    'login-authentication',
    'insert-student',
    'insert-user',
    'insert-class',
    'insert-teacher'
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
    'login-success',
    'insert-student-response',
    'insert-user-response',
    'insert-class-response',
    'insert-teacher-response'
];


/**
 * Expose a secure API to the renderer process using the `contextBridge` API.
 * This API will be available in the renderer under `window.api`.
 */
contextBridge.exposeInMainWorld('api', {
    /**
     * Sends an IPC message to the main process, but only if the channel is valid.
     *
     * @param {string} channel - The channel name to send the data to.
     * @param {any} data - The data to send to the main process.
     */
    send: (channel, data) => {
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },

    /**
     * Registers a listener for an IPC message from the main process, but only if the channel is valid.
     *
     * @param {string} channel - The channel name to listen to.
     * @param {function} func - The callback function to invoke when the message is received.
     * @returns {function} A function that removes the listener when called.
     */
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
