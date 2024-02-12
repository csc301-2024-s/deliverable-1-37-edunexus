const { contextBridgem, ipcRenderer } = require('electron');
const { insertUser, getUsers } = require('./database.js');

contextBridge.exposeInMainWorld('api', {
  insertUser: (name, email) => insertUser(name, email),
  getUsers: () => new Promise((resolve, reject) => {
    getUsers((err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  }),
  send: (channel, data) => ipcRenderer.send('signupData', data),
  receive: (channel, func) => ipcRenderer.on(
      channel,
      (event, ...args) => func(args)
  )
});

