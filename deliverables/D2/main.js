const { app, BrowserWindow, Menu, ipcMain } = require('electron/main')
const path = require('node:path')
const database = require('./database.js')

// Users
async function checkUsername (event, username) {
  const webContents = event.sender
  try {
    const existingUser = await database.getUserbyUsername(username)
    console.log(existingUser)
    if (existingUser) {
      webContents.send('userResponse', [true, 'Username found'])
      return { success: true };
    }
    webContents.send('userResponse', [false, 'Username not found'])
    return { success: false, error: 'Username not found' };
  } catch (error) {
    webContents.send('userResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message };
  }
}

async function createUser (event, username, password) {
  const webContents = event.sender
  try {
    const existingUser = await database.getUserbyUsername(username);
    if (existingUser) {
      webContents.send('userResponse', [false, 'Username already in use'])
      return { success: false, error: 'Username already in use' };
    }

    const userId = await database.insertUser(username, password);
    webContents.send('userResponse', [true, 'User successfully created with id ' + userId])
    return { success: true, userId };
  } catch (error) {
    webContents.send('userResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message };
  }
}

async function login (event, username, password) {
  const webContents = event.sender
  try {
    const existingUser = await database.checkLogin(username, password)
    if (existingUser) {
      webContents.send('userResponse', [true, 'Login successful'])
      return { success: true };
    }
    webContents.send('userResponse', [false, 'Username or password is incorrect'])
    return { success: false, error: 'Username not found' };
  } catch (error) {
    webContents.send('userResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message };
  }
}

// Students
async function createStudent (event, studentName, studentNumber, age) {
  const webContents = event.sender
  try {
    const existingStudent = await database.getStudentbyStudentNumber(studentNumber);
    if (existingStudent) {
      webContents.send('studentResponse', [false, 'Student number already in use'])
      return { success: false, error: 'Student number already in use' };
    }

    const studentID = await database.insertStudent(studentName, studentNumber, age);
    webContents.send('studentResponse', [true, 'Student successfully created with id ' + studentID])
    return { success: true, studentID };
  } catch (error) {
    webContents.send('studentResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message };
  }
}

async function checkStudentNumber (event, studentNumber) {
  const webContents = event.sender
  try {
    const existingStudent = await database.getStudentbyStudentNumber(studentNumber)
    if (existingStudent) {
      webContents.send('studentResponse', [true, 'student id: ' + existingStudent.id +
      '\nstudent name: ' + existingStudent.name +
      '\nstudent number: ' + existingStudent.student_number +
      '\nstudent age: ' + existingStudent.age])
      return { success: true };
    }
    webContents.send('studentResponse', [false, 'Student not found'])
    return { success: false, error: 'Student not found' };
  } catch (error) {
    webContents.send('studentResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message };
  }
}

async function createTeacher (event, teacherName, teacherNumber) {
  const webContents = event.sender
  try {
    const existingTeacher = await database.getTeacherbyTeacherNumber(teacherNumber);
    if (existingTeacher) {
      webContents.send('teacherResponse', [false, 'Teacher number already in use'])
      return { success: false, error: 'Teacher number already in use' };
    }

    const teacherId = await database.insertTeacher(teacherName, teacherNumber);
    webContents.send('teacherResponse', [true, 'Teacher successfully created with id ' + teacherId])
    return { success: true, teacherId };
  } catch (error) {
    webContents.send('teacherResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message };
  }
}

async function checkTeacherNumber (event, teacherNumber) {
  const webContents = event.sender
  try {
    const existingTeacher = await database.getTeacherbyTeacherNumber(teacherNumber)
    if (existingTeacher) {
      console.log(existingTeacher)
      webContents.send('teacherResponse', [true, 'teacher id: ' + existingTeacher.id +
      '\nteacher name: ' + existingTeacher.name +
      '\nteacher number: ' + existingTeacher.teacher_number])
      return { success: true };
    }
    webContents.send('teacherResponse', [false, 'Teacher not found'])
    return { success: false, error: 'Teacher not found' };
  } catch (error) {
    webContents.send('teacherResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message };
  }
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  // Users
  ipcMain.on('createUser', createUser)
  ipcMain.on('checkUsername', checkUsername)
  ipcMain.on('login', login)
  // Students
  ipcMain.on('createStudent', createStudent)
  ipcMain.on('checkStudentNumber', checkStudentNumber)

  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})