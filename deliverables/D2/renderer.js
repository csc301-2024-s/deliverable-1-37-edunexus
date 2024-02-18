// User part
const createUser = document.getElementById('createUser')
const checkUser = document.getElementById('checkUser')
const login = document.getElementById('login')
const deleteUser = document.getElementById('deleteUser')
const updatePassword = document.getElementById('updatePassword')
const usernameElement = document.getElementById('username')
const passwordElement = document.getElementById('password')
const userResponseElement = document.getElementById('userResponse')

checkUser.addEventListener('click', () => {
  const username = usernameElement.value
  window.api.checkUsername(username)
})

createUser.addEventListener('click', async() => {
  const username = usernameElement.value
  const password = passwordElement.value
  window.api.createUser(username, password)
})

login.addEventListener('click', async() => {
  const username = usernameElement.value
  const password = passwordElement.value
  window.api.login(username, password)
})
  
deleteUser.addEventListener('click', async() => {
  const username = usernameElement.value
  window.api.deleteUser(username)
})

updatePassword.addEventListener('click', async() => {
  const username = usernameElement.value
  const password = passwordElement.value
  window.api.updatePassword(username, password)
})

const counter = document.getElementById('counter')

window.api.userResponse((data) => {
  success = data[0]
  response = data[1]
  userResponseElement.innerText = response
  if (success) {
    userResponseElement.style.color = 'green'
  } else {
    userResponseElement.style.color = 'red'
  }
})

// Student part
const createStudent = document.getElementById('createStudent')
const checkStudentNumber = document.getElementById('checkStudentNumber')
const getAllStudent = document.getElementById('getAllStudent')
const deleteStudent = document.getElementById('deleteStudent')
const studentResponseElement = document.getElementById('studentResponse')
const studentNameElement = document.getElementById('studentName')
const studentNumberElement = document.getElementById('studentNumber')
const ageElement = document.getElementById('age')


createStudent.addEventListener('click', () => {
  const studentName = studentNameElement.value
  const studentNumber = studentNumberElement.value
  const age = ageElement.value
  window.api.createStudent(studentName, studentNumber, age)
})

checkStudentNumber.addEventListener('click', async() => {
  const studentNumber = studentNumberElement.value
  window.api.checkStudentNumber(studentNumber)
})

getAllStudent.addEventListener('click', async() => {
  window.api.getAllStudent()
})

deleteStudent.addEventListener('click', async() => {
  const studentNumber = studentNumberElement.value
  window.api.deleteStudent(studentNumber)
})

window.api.studentResponse((data) => {
  success = data[0]
  response = data[1]
  studentResponseElement.innerText = response
  if (success) {
    studentResponseElement.style.color = 'green'
  } else {
    studentResponseElement.style.color = 'red'
  }
})

// Teacher part
const createTeacher = document.getElementById('createTeacher')
const checkTeacherNumber = document.getElementById('checkTeacherNumber')
const getAllTeacher = document.getElementById('getAllTeacher')
const deleteTeacher = document.getElementById('deleteTeacher')
const teacherResponseElement = document.getElementById('teacherResponse')
const teacherNameElement = document.getElementById('teacherName')
const teacherNumberElement = document.getElementById('teacherNumber')


createTeacher.addEventListener('click', () => {
  const teacherName = teacherNameElement.value
  const teacherNumber = teacherNumberElement.value
  window.api.createTeacher(teacherName, teacherNumber)
})

checkTeacherNumber.addEventListener('click', async() => {
  const teacherNumber = teacherNumberElement.value
  window.api.checkTeacherNumber(teacherNumber)
})

getAllTeacher.addEventListener('click', async() => {
  window.api.getAllTeacher()
})

deleteTeacher.addEventListener('click', async() => {
  const teacherNumber = teacherNumberElement.value
  window.api.deleteTeacher(teacherNumber)
})

window.api.teacherResponse((data) => {
  success = data[0]
  response = data[1]
  teacherResponseElement.innerText = response
  if (success) {
    teacherResponseElement.style.color = 'green'
  } else {
    teacherResponseElement.style.color = 'red'
  }
})