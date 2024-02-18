const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  // User related
  createUser: (username, password) => ipcRenderer.send('createUser', username, password),
  checkUsername: (username) => ipcRenderer.send('checkUsername', username),
  login: (username, password) => ipcRenderer.send('login', username, password),
  userResponse: (callback) => ipcRenderer.on('userResponse', (_event, data) => callback(data)),
  // Student related
  createStudent: (studentName, studentNumber, age) => ipcRenderer.send('createStudent', studentName, studentNumber, age),
  checkStudentNumber: (studentNumber) => ipcRenderer.send('checkStudentNumber', studentNumber),
  studentResponse: (callback) => ipcRenderer.on('studentResponse', (_event, data) => callback(data))
})