const sqlite3 = require('sqlite3').verbose()

// Create a new database if it does not exist, and open database for read and write
let db = new sqlite3.Database('./edunexus.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error(err.message)
  }
})


// Create tables if not created
db.parallelize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS student (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_number INTEGER UNIQUE,
          name TEXT NOT NULL,
          age INTEGER NOT NULL
          )`)
    .run(`CREATE TABLE IF NOT EXISTS teacher (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          teacher_number INTEGER UNIQUE,
          name TEXT NOT NULL UNIQUE
          )`)
    .run(`CREATE TABLE IF NOT EXISTS subject (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
          )`)
    .run(`CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
          )`)
    .run(`PRAGMA foreign_keys = ON`)
})
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS class (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          year INTEGER NOT NULL,
          grade INTEGER NOT NULL,
          teacher_number INTEGER REFERENCES teacher (teacher_number),
          subject_id INTEGER REFERENCES subject (id)
          )`)
    .run(`CREATE TABLE IF NOT EXISTS mark (
          mark INTEGER NOT NULL,
          student_number INTEGER REFERENCES student (student_number),
          class_id INTEGER REFERENCES class (id),
          year INTEGER NOT NULL,
          PRIMARY KEY (student_number, class_id)
          )`)
})

// User related functions
// password is not encrypted for now as we're not sure where will it be encrypted
function insertUser(username, password) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO user (username, password) VALUES(?, ?)`
    db.run(sql, [username, password], function(err) {
      if (err) {
        reject(err)
      }
      resolve(this.lastID)
    })
  })
}

function getUserbyUsername(username) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM user WHERE username = ?`
    db.get(sql, [username], (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

function checkLogin(username, password) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM user WHERE username = ? AND password = ?`
    db.get(sql, [username, password], (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

// Student related functions
// may need to check for integer for studentNumber and age
function insertStudent(name, studentNumber, age) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO student (student_number, name, age) VALUES(?, ?, ?)`
    db.run(sql, [studentNumber, name, age], function(err) {
      if (err) {
        reject(err)
      }
      resolve(this.lastID)
    })
  })
}

function getStudentbyStudentNumber(studentNumber) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM student WHERE student_number = ?`
    db.get(sql, [studentNumber], (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

// Teacher related functions
function insertTeacher(name, teacherNumber) {
  return new Promise((resolve, reject) => {
  const sql = `INSERT INTO teacher (teacher_number, name) VALUES(?, ?)`
    db.run(sql, [teacherNumber, name], function(err) {
      if (err) {
        reject(err)
      }
      resolve(this.lastID)
    })
  })
}

function getTeacherbyTeacherNumber(teacherNumber) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM teacher WHERE teacher_number = ?`
    db.get(sql, [teacherNumber], (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

module.exports = {
  insertUser,
  getUserbyUsername,
  checkLogin,
  insertStudent,
  getStudentbyStudentNumber,
  insertTeacher,
  getTeacherbyTeacherNumber
}
