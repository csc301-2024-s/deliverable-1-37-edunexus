<<<<<<< HEAD
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    let validChannels = ["loginData", "signupData", "request-report-generation"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["loginResponse", "signupResponse", "report-generation-complete", "report-generation-failed"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
=======
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  // User related
  createUser: (username, password) => ipcRenderer.send('createUser', username, password),
  checkUsername: (username) => ipcRenderer.send('checkUsername', username),
  login: (username, password) => ipcRenderer.send('login', username, password),
  deleteUser: (username) => ipcRenderer.send('deleteUser', username),
  updatePassword: (username, password) => ipcRenderer.send('updatePassword', username, password),
  userResponse: (callback) => ipcRenderer.on('userResponse', (_event, data) => callback(data)),
  // Student related
  createStudent: (studentName, studentNumber, age) => ipcRenderer.send('createStudent', studentName, studentNumber, age),
  checkStudentNumber: (studentNumber) => ipcRenderer.send('checkStudentNumber', studentNumber),
  getAllStudent: () => ipcRenderer.send('getAllStudent'),
  deleteStudent: (studentNumber) => ipcRenderer.send('deleteStudent', studentNumber),
  studentResponse: (callback) => ipcRenderer.on('studentResponse', (_event, data) => callback(data)),
  // Teacher related
  createTeacher: (teacherName, teacherNumber) => ipcRenderer.send('createTeacher', teacherName, teacherNumber),
  checkTeacherNumber: (teacherNumber) => ipcRenderer.send('checkTeacherNumber', teacherNumber),
  getAllTeacher: () => ipcRenderer.send('getAllTeacher'),
  deleteTeacher: (teacherNumber) => ipcRenderer.send('deleteTeacher', teacherNumber),
  teacherResponse: (callback) => ipcRenderer.on('teacherResponse', (_event, data) => callback(data)),
})
>>>>>>> origin/D2-37.3
