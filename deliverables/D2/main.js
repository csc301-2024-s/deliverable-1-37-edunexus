const { app, BrowserWindow, Menu, ipcMain } = require('electron/main')
const path = require('node:path')
const database = require('./database/database.js')

// Users
async function checkUsername (event, username) {
  const webContents = event.sender
  try {
    const existingUser = await database.getUser(username)
    if (existingUser) {
      webContents.send('userResponse', [true, 'Username found'])
      return { success: true }
    }
    webContents.send('userResponse', [false, 'Username not found'])
    return { success: false, error: 'Username not found' }
  } catch (error) {
    webContents.send('userResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function createUser (event, username, password) {
  const webContents = event.sender
  try {
    const existingUser = await database.getUser(username)
    if (existingUser) {
      webContents.send('userResponse', [false, 'Username already in use'])
      return { success: false, error: 'Username already in use' }
    }

    const userId = await database.insertUser(username, password)
    webContents.send('userResponse', [true, 'User successfully created with id ' + userId])
    return { success: true, userId }
  } catch (error) {
    webContents.send('userResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function login (event, username, password) {
  const webContents = event.sender
  try {
    const existingUser = await database.checkLogin(username, password)
    if (existingUser) {
      webContents.send('userResponse', [true, 'Login successful'])
      return { success: true }
    }
    webContents.send('userResponse', [false, 'Username or password is incorrect'])
    return { success: false, error: 'Username not found' }
  } catch (error) {
    webContents.send('userResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function deleteUser (event, username) {
  const webContents = event.sender
  try {
    const deletedUser = await database.deleteUser(username)
    if (deletedUser) {
      webContents.send('userResponse', [true, 'Delete successful'])
      return { success: true }
    }
    webContents.send('userResponse', [false, 'Username not found'])
    return { success: false, error: 'Username not found' }
  } catch (error) {
    webContents.send('userResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function updateUserPassword (event, username, password) {
  const webContents = event.sender
  try {
    const changedUser = await database.updateUserPassword(username, password)
    if (changedUser) {
      webContents.send('userResponse', [true, 'Password changed'])
      return { success: true }
    }
    webContents.send('userResponse', [false, 'Username not found, password changed failed'])
    return { success: false, error: 'Username not found' }
  } catch (error) {
    webContents.send('userResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

// Students
async function createStudent (event, studentName, studentNumber, age) {
  const webContents = event.sender
  try {
    const existingStudent = await database.getStudent(studentNumber)
    if (existingStudent) {
      webContents.send('studentResponse', [false, 'Student number already in use'])
      return { success: false, error: 'Student number already in use' }
    }

    const studentID = await database.insertStudent(studentName, studentNumber, age)
    webContents.send('studentResponse', [true, 'Student successfully created with id ' + studentID])
    return { success: true, studentID }
  } catch (error) {
    webContents.send('studentResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function checkStudentNumber (event, studentNumber) {
  const webContents = event.sender
  try {
    const existingStudent = await database.getStudent(studentNumber)
    if (existingStudent) {
      webContents.send('studentResponse', [true, 'student id: ' + existingStudent.id +
      ', student name: ' + existingStudent.name +
      ', student number: ' + existingStudent.student_number +
      ', student age: ' + existingStudent.age])
      return { success: true }
    }
    webContents.send('studentResponse', [false, 'Student not found'])
    return { success: false, error: 'Student not found' }
  } catch (error) {
    webContents.send('studentResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function getAllStudent (event) {
  const webContents = event.sender
  try {
    const existingStudents = await database.getAllStudent()
    if (existingStudents) {
      s = ""
      existingStudents.forEach((student) => {
        s += 'student id: ' + student.id
        s += ', student name: ' + student.name
        s += ', student number: ' + student.student_number
        s += ', student age: ' + student.age
        s += '\n'
      })
      webContents.send('studentResponse', [true, s])
      return { success: true }
    }
    webContents.send('studentResponse', [false, 'No student found'])
    return { success: false, error: 'No student found' }
  } catch (error) {
    webContents.send('studentResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function deleteStudent (event, studentNumber) {
  const webContents = event.sender
  try {
    const deletedStudent = await database.deleteStudent(studentNumber)
    if (deletedStudent) {
      webContents.send('studentResponse', [true, 'Delete successful'])
      return { success: true }
    }
    webContents.send('studentResponse', [false, 'Student number not found'])
    return { success: false, error: 'Studentname not found' }
  } catch (error) {
    webContents.send('studentResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

// Teachers
async function createTeacher (event, teacherName, teacherNumber) {
  const webContents = event.sender
  try {
    const existingTeacher = await database.getTeacher(teacherNumber)
    if (existingTeacher) {
      webContents.send('teacherResponse', [false, 'Teacher number already in use'])
      return { success: false, error: 'Teacher number already in use' }
    }

    const teacherId = await database.insertTeacher(teacherName, teacherNumber)
    webContents.send('teacherResponse', [true, 'Teacher successfully created with id ' + teacherId])
    return { success: true, teacherId }
  } catch (error) {
    webContents.send('teacherResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function checkTeacherNumber (event, teacherNumber) {
  const webContents = event.sender
  try {
    const existingTeacher = await database.getTeacher(teacherNumber)
    if (existingTeacher) {
      webContents.send('teacherResponse', [true, 'teacher id: ' + existingTeacher.id +
      ', teacher name: ' + existingTeacher.name +
      ', teacher number: ' + existingTeacher.teacher_number])
      return { success: true }
    }
    webContents.send('teacherResponse', [false, 'Teacher not found'])
    return { success: false, error: 'Teacher not found' }
  } catch (error) {
    webContents.send('teacherResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function getAllTeacher (event) {
  const webContents = event.sender
  try {
    const existingTeachers = await database.getAllTeacher()
    if (existingTeachers) {
      s = ""
      existingTeachers.forEach((teacher) => {
        s += 'teacher id: ' + teacher.id
        s += ', teacher name: ' + teacher.name
        s += ', teacher number: ' + teacher.teacher_number
        s += '\n'
      })
      webContents.send('teacherResponse', [true, s])
      return { success: true }
    }Students
    webContents.send('teacherResponse', [false, 'No teacher found'])
    return { success: false, error: 'No teacher found' }
  } catch (error) {
    webContents.send('teacherResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function deleteTeacher (event, teacherNumber) {
  const webContents = event.sender
  try {
    const deletedTeacher = await database.deleteTeacher(teacherNumber)
    if (deletedTeacher) {
      webContents.send('teacherResponse', [true, 'Delete successful'])
      return { success: true }
    }
    webContents.send('teacherResponse', [false, 'Teacher number not found'])
    return { success: false, error: 'Teachername not found' }
  } catch (error) {
    webContents.send('teacherResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

// Subjects
async function createSubject (event, name) {
  const webContents = event.sender
  try {
    const existingSubject = await database.getSubject(name)
    if (existingSubject) {
      webContents.send('subjectResponse', [false, 'Subject name already in use'])
      return { success: false, error: 'Subject name already in use' }
    }

    const subjectId = await database.insertSubject(name)
    webContents.send('subjectResponse', [true, 'Subject successfully created with id ' + subjectId])
    return { success: true, subjectId }
  } catch (error) {
    webContents.send('subjectResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function checkSubjectName (event, name) {
  const webContents = event.sender
  console.log(name)
  try {
    const existingSubject = await database.getSubject(name)
    if (existingSubject) {
      webContents.send('subjectResponse', [true, 'subject id: ' + existingSubject.id +
      ', subject name: ' + existingSubject.name])
      return { success: true }
    }
    webContents.send('subjectResponse', [false, 'Subject not found'])
    return { success: false, error: 'Subject not found' }
  } catch (error) {
    webContents.send('subjectResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function getAllSubject (event) {
  const webContents = event.sender
  try {
    const existingSubjects = await database.getAllSubject()
    if (existingSubjects) {
      s = ""
      existingSubjects.forEach((subject) => {
        s += 'subject id: ' + subject.id
        s += ', subject name: ' + subject.name
        s += '\n'
      })
      webContents.send('subjectResponse', [true, s])
      return { success: true }
    }Students
    webContents.send('subjectResponse', [false, 'No subject found'])
    return { success: false, error: 'No subject found' }
  } catch (error) {
    webContents.send('subjectResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
  }
}

async function deleteSubject (event, name) {
  const webContents = event.sender
  try {
    const deletedSubject = await database.deleteSubject(name)
    if (deletedSubject) {
      webContents.send('subjectResponse', [true, 'Delete successful'])
      return { success: true }
    }
    webContents.send('subjectResponse', [false, 'Subject not found'])
    return { success: false, error: 'Subject not found' }
  } catch (error) {
    webContents.send('subjectResponse', [false, 'Error: ' + error.message])
    return { success: false, error: error.message }
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
  ipcMain.on('deleteUser', deleteUser)
  ipcMain.on('updatePassword', updateUserPassword)
  // Students
  ipcMain.on('createStudent', createStudent)
  ipcMain.on('checkStudentNumber', checkStudentNumber)
  ipcMain.on('getAllStudent', getAllStudent)
  ipcMain.on('deleteStudent', deleteStudent)
  // Teachers
  ipcMain.on('createTeacher', createTeacher)
  ipcMain.on('checkTeacherNumber', checkTeacherNumber)
  ipcMain.on('getAllTeacher', getAllTeacher)
  ipcMain.on('deleteTeacher', deleteTeacher)

  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})