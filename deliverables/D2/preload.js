const { contextBridge } = require('electron');
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
  })
});