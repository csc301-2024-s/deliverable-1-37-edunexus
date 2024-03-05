const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const saltRounds = 10;

let db = new sqlite3.Database(path.resolve("edunexus.db"), (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

function createUsersTable(){
  return new Promise((resolve, reject) =>{
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error creating table', err.message);
        reject(err);
      } else {
        console.log('Table created or already exists.');
        resolve();
      }
    });
  });
}

function insertUser(name, email, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        reject(err);
        return;
      }
      const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
      db.run(sql, [name, email, hash], function(err) {
        if (err) {
          console.error('Error inserting user:', err.message);
          reject(err);
        } else {
          console.log(`A new user has been added with ID ${this.lastID}.`);
          resolve(this.lastID);
        }
      });
    });
  });
}


function deleteUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM users WHERE email = ?`;
    db.run(sql, [email], function(err) {
      if (err) {
        console.error('Error deleting user:', err.message);
        reject(err);
      } else {
        console.log(`User deleted with Email ${email}`);
        resolve();
      }
    });
  });
}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id FROM users WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function verifyUser(email, password) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], (err, user) => {
      if (err) {
        reject(err);
      } else if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            resolve(user);
          } else {
            reject('Password does not match');
          }
        });
      } else {
        reject('User not found');
      }
    });
  });
}

function createStudentsTable() {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      class TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error creating students table', err.message);
        reject(err);
      } else {
        console.log('Students table created or already exists.');
        resolve();
      }
    });
  });
}

function insertStudent(name, grade) {
  const sql = `INSERT INTO students (name, class) VALUES (?, ?)`;
  db.run(sql, [name, grade], (err) => {
    if (err) {
      console.error('Error inserting student', err.message);
    } else {
      console.log('A new student has been added.');
    }
  });
}

function createAcademicPerformanceTable() {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS academic_performance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      subject TEXT NOT NULL,
      score INTEGER NOT NULL,
      FOREIGN KEY(student_id) REFERENCES students(id)
    )`, (err) => {
      if (err) {
        console.error('Error creating academic_performance table', err.message);
        reject(err);
      } else {
        console.log('Academic performance table created or already exists.');
        resolve();
      }
    });
  });
}

function insertAcademicRecord(studentId, subject, score) {
  const sql = `INSERT INTO academic_performance (student_id, subject, score) VALUES (?, ?, ?)`;
  db.run(sql, [studentId, subject, score], (err) => {
    if (err) {
      console.error('Error inserting academic record', err.message);
    } else {
      console.log('A new academic record has been added.');
    }
  });
}

function getStudentDetails(studentId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM students WHERE id = ?`;
      db.get(sql, [studentId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

function getAcademicPerformance(studentId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM academic_performance WHERE student_id = ?`;
      db.all(sql, [studentId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

function createAttendanceRecordsTable() {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE IF NOT EXISTS attendance_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL,
      FOREIGN KEY(student_id) REFERENCES students(id)
    )`;
    db.run(sql, (err) => {
      if (err) {
        console.error('Error creating attendance_records table', err.message);
        reject(err);
      } else {
        console.log('Attendance records table created or already exists.');
        resolve();
      }
    });
  });
}

  function getAttendanceRecords(studentId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM attendance_records WHERE student_id = ?`;
      db.all(sql, [studentId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

function generateAcademicReport(studentId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT subject, AVG(score) as averageScore FROM academic_performance WHERE student_id = ? GROUP BY subject`;
    db.all(sql, [studentId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  createUsersTable,
  insertUser,
  getUserByEmail,
  verifyUser,
  createStudentsTable,
  insertStudent,
  createAcademicPerformanceTable,
  getStudentDetails,
  insertAcademicRecord,
  getAcademicPerformance,
  getAttendanceRecords,
  generateAcademicReport,
  createAttendanceRecordsTable,
  deleteUserByEmail
};
