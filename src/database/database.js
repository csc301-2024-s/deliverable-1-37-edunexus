const sqlite3 = require('sqlite3').verbose();

// Create a new database if it does not exist, and open database for read and write
let db = new sqlite3.Database('./edunexus.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return err.message;
    }
});


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
        .run('PRAGMA foreign_keys = ON');
});
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
          )`);
});

// user related functions
// password is not encrypted for now as we're not sure where will it be encrypted
function insertUser(username, password) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO user (username, password) VALUES(?, ?)';
        db.run(sql, [username, password], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.lastID);
        });
    });
}

function getUser(username) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE username = ?';
        db.get(sql, [username], (err, user) => {
            if (err) {
                reject(err);
            }
            resolve(user);
        });
    });
}

function checkLogin(username, password) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
        db.get(sql, [username, password], (err, user) => {
            if (err) {
                reject(err);
            }
            resolve(user);
        });
    });
}

function deleteUser(username) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM user WHERE username = ?';
        db.run(sql, [username], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.changes);
        });
    });
}

function updateUserPassword(username, password) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE user SET password = ? WHERE username = ?';
        db.run(sql, [password, username], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.changes);
        });
    });
}


// student related
// may need to check for integer for studentNumber and age
function insertStudent(name, studentNumber, age) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO student (student_number, name, age) VALUES(?, ?, ?)';
        db.run(sql, [studentNumber, name, age], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.lastID);
        });
    });
}

function getStudent(studentNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM student WHERE student_number = ?';
        db.get(sql, [studentNumber], (err, student) => {
            if (err) {
                reject(err);
            }
            resolve(student);
        });
    });
}

function getAllStudent() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM student';
        db.all(sql, (err, students) => {
            if (err) {
                reject(err);
            }
            resolve(students);
        });
    });
}

function deleteStudent(studentNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM student WHERE student_number = ?';
        db.run(sql, [studentNumber], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.changes);
        });
    });
}


// teacher related
function insertTeacher(name, teacherNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO teacher (teacher_number, name) VALUES(?, ?)';
        db.run(sql, [teacherNumber, name], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.lastID);
        });
    });
}

function getTeacher(teacherNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM teacher WHERE teacher_number = ?';
        db.get(sql, [teacherNumber], (err, teacher) => {
            if (err) {
                reject(err);
            }
            resolve(teacher);
        });
    });
}

function getAllTeacher() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM teacher';
        db.all(sql, (err, teachers) => {
            if (err) {
                reject(err);
            }
            resolve(teachers);
        });
    });
}

function deleteTeacher(teacherNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM teacher WHERE teacher_number = ?';
        db.run(sql, [teacherNumber], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.changes);
        });
    });
}

// subject related
function insertSubject(name) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO subject (name) VALUES(?)';
        db.run(sql, [name], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.lastID);
        });
    });
}

function getSubject(name) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM subject WHERE name = ?';
        db.get(sql, [name], (err, subject) => {
            if (err) {
                reject(err);
            }
            resolve(subject);
        });
    });
}

function getAllSubject() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM subject';
        db.all(sql, (err, subjects) => {
            if (err) {
                reject(err);
            }
            resolve(subjects);
        });
    });
}

function deleteSubject(name) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM subject WHERE name = ?';
        db.run(sql, [name], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.changes);
        });
    });
}

// class related
function insertClass(name, year, grade, teacherNumber, subjectID) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO class (name, year, grade, teacher_number, subject_id) VALUES(?, ?, ?, ?, ?)';
        db.run(sql, [name, year, grade, teacherNumber, subjectID], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.lastID);
        });
    });
}

function getClass(name = '', year = '', grade = '', teacherNumber = '', subjectID = '') {
    return new Promise((resolve, reject) => {
        if (!name & !year & !grade & !teacherNumber & !subjectID) {
            reject('No input, use getAllClass instead');
        }
        let sql = 'SELECT * FROM class WHERE ';
        let values = [];
        if (name) {
            sql += 'name = ? AND ';
            values += name;
        }
        if (year) {
            sql += 'year = ? AND ';
            values += year;
        }
        if (grade) {
            sql += 'grade = ? AND ';
            values += grade;
        }
        if (teacherNumber) {
            sql += 'teacher_number = ? AND ';
            values += teacherNumber;
        }
        if (subjectID) {
            sql += 'subject_id = ? AND ';
            values += subjectID;
        }
        sql = sql.substring(0, sql.length - 5);
        db.get(sql, values, (err, c) => {
            if (err) {
                reject(err);
            }
            resolve(c);
        });
    });
}

function getAllClass() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM class';
        db.all(sql, (err, classes) => {
            if (err) {
                reject(err);
            }
            resolve(classes);
        });
    });
}

function deleteClass(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM class WHERE id = ?';
        db.run(sql, [id], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.changes);
        });
    });
}

// mark related

function insertMark(mark, studentNumber, classID, year) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO mark (mark, student_number, classID, year) VALUES(?, ?, ?, ?)';
        db.run(sql, [mark, studentNumber, classID, year], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.lastID);
        });
    });
}

function getClassAvgMark(classID) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT AVG(mark) FROM mark WHERE class_id = ?';
        db.get(sql, [classID], (err, mark) => {
            if (err) {
                reject(err);
            }
            resolve(mark);
        });
    });
}

function getStudentAvgMark(studentNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT AVG(mark) FROM mark WHERE student_number = ?';
        db.get(sql, [studentNumber], (err, mark) => {
            if (err) {
                reject(err);
            }
            resolve(mark);
        });
    });
}

function getStudentAvgMarkbyYear(studentNumber, year) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT AVG(mark) FROM mark WHERE student_number = ? AND year = ?';
        db.get(sql, [studentNumber, year], (err, mark) => {
            if (err) {
                reject(err);
            }
            resolve(mark);
        });
    });
}

function getClassMarks(classID) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT mark, student_number FROM mark WHERE class_id = ?';
        db.all(sql, [classID], (err, mark) => {
            if (err) {
                reject(err);
            }
            resolve(mark);
        });
    });
}

function getStudentMarks(studentNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT mark, class_id FROM mark WHERE student_number = ?';
        db.all(sql, [studentNumber], (err, mark) => {
            if (err) {
                reject(err);
            }
            resolve(mark);
        });
    });
}

function getStudentMarksbyYear(studentNumber, year) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT mark, class_id FROM mark WHERE student_number = ? AND year = ?';
        db.all(sql, [studentNumber, year], (err, mark) => {
            if (err) {
                reject(err);
            }
            resolve(mark);
        });
    });
}

function deleteMark(studentNumber, classID) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM mark WHERE student_number = ? AND class_id = ?';
        db.run(sql, [studentNumber, classID], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.changes);
        });
    });
}


module.exports = {
    // User
    insertUser,
    getUser,
    checkLogin,
    deleteUser,
    updateUserPassword,
    // Student
    insertStudent,
    getStudent,
    getAllStudent,
    deleteStudent,
    // Teacher
    insertTeacher,
    getTeacher,
    getAllTeacher,
    deleteTeacher,
    // Subject
    insertSubject,
    getSubject,
    getAllSubject,
    deleteSubject,
    // Class
    insertClass,
    getClass,
    getAllClass,
    deleteClass,
    // Mark
    insertMark,
    getClassAvgMark,
    getStudentAvgMark,
    getStudentAvgMarkbyYear,
    getClassMarks,
    getStudentMarks,
    getStudentMarksbyYear,
    deleteMark
};
