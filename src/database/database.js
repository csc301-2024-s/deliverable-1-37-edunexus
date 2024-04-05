const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create a new database if it does not exist, and open database for read and write
let db;

function connectDB(path) {
    db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            return err.message;
        }
    });
}

function disconnectDB() {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) {
                return reject(err);
            }
            return resolve(true);
        });
    });
}

// Create tables if not created
function initDB() {
    try {
        db.parallelize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS student (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  studentNumber INTEGER UNIQUE,
                  name TEXT NOT NULL,
                  age INTEGER NOT NULL
                  )`)
                .run(`CREATE TABLE IF NOT EXISTS teacher (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    teacherNumber INTEGER UNIQUE,
                    name TEXT NOT NULL
                    )`)
                .run(`CREATE TABLE IF NOT EXISTS subject (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL
                    )`)
                .run(`CREATE TABLE IF NOT EXISTS user (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    admin INTEGER NOT NULL,
                    teacherNumber INTEGER NOT NULL
                    )`)
                .run('PRAGMA foreign_keys = ON');
        });
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS class (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    year INTEGER NOT NULL,
                    grade INTEGER NOT NULL,
                    teacherNumber INTEGER REFERENCES teacher (teacherNumber),
                    subjectID INTEGER REFERENCES subject (id)
                    )`)
                .run(`CREATE TABLE IF NOT EXISTS mark (
                    name TEXT NOT NULL,
                    mark INTEGER NOT NULL,
                    studentNumber INTEGER REFERENCES student (studentNumber),
                    classID INTEGER REFERENCES class (id),
                    PRIMARY KEY (name, studentNumber, classID)
                    )`);
        });
        return true;
    }
    catch (err) {
        return err.message;
    }
}
// user related functions
function insertUser(username, password, admin = 0, teacherNumber = 0) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO user (username, password, admin, teacherNumber) VALUES(?, ?, ?, ?)';
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                return reject(err);
            }
            db.run(sql, [username, hash, admin, teacherNumber], function (err) {
                if (err) {
                    return reject(err);
                }
                return resolve(this.lastID);
            });
        });
    });
}

function getUser(username) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE username = ?';
        db.get(sql, [username], (err, user) => {
            if (err) {
                return reject(err);
            }
            return resolve(user);
        });
    });
}

function getAllUser() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user';
        db.all(sql, (err, user) => {
            if (err) {
                return reject(err);
            }
            return resolve(user);
        });
    });
}

function checkUserPassword(username, password) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT password FROM user WHERE username = ?';
        db.get(sql, [username], (err, user) => {
            if (err) {
                return reject(err);
            }
            if (!user) {
                return resolve(false);
            }
            else {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
            }
        });
    });
}

function deleteUser(username) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM user WHERE username = ?';
        db.run(sql, [username], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.changes);
        });
    });
}

function updateUserPassword(username, password) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE user SET password = ? WHERE username = ?';
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                return reject (err);
            }
            db.run(sql, [username, hash], function (err) {
                if (err) {
                    return reject(err);
                }
                return resolve(this.changes);
            });
        });
    });
}

function updateUserTeacherNumber(username, teacherNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE user SET teacherNumber = ? WHERE username = ?';
        db.run(sql, [username, teacherNumber], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.changes);
        });
    });
}

// student related
// may need to check for integer for studentNumber and age
function insertStudent(name, studentNumber, age) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO student (studentNumber, name, age) VALUES(?, ?, ?)';
        db.run(sql, [studentNumber, name, age], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.lastID);
        });
    });
}

function getStudent(studentNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM student WHERE studentNumber = ?';
        db.get(sql, [studentNumber], (err, student) => {
            if (err) {
                return reject(err);
            }
            return resolve(student);
        });
    });
}

function getAllStudent() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM student';
        db.all(sql, (err, students) => {
            if (err) {
                return reject(err);
            }
            return resolve(students);
        });
    });
}

function deleteStudent(studentNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM student WHERE studentNumber = ?';
        db.run(sql, [studentNumber], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.changes);
        });
    });
}


// teacher related
function insertTeacher(name, teacherNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO teacher (teacherNumber, name) VALUES(?, ?)';
        db.run(sql, [teacherNumber, name], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.lastID);
        });
    });
}

function getTeacher(teacherNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM teacher WHERE teacherNumber = ?';
        db.get(sql, [teacherNumber], (err, teacher) => {
            if (err) {
                return reject(err);
            }
            return resolve(teacher);
        });
    });
}

function getAllTeacher() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM teacher';
        db.all(sql, (err, teachers) => {
            if (err) {
                return reject(err);
            }
            return resolve(teachers);
        });
    });
}

function deleteTeacher(teacherNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM teacher WHERE teacherNumber = ?';
        db.run(sql, [teacherNumber], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.changes);
        });
    });
}

// subject related
function insertSubject(name) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO subject (name) VALUES(?)';
        db.run(sql, [name], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.lastID);
        });
    });
}

function getSubject(name) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM subject WHERE name = ?';
        db.get(sql, [name], (err, subject) => {
            if (err) {
                return reject(err);
            }
            return resolve(subject);
        });
    });
}

function getAllSubject() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM subject';
        db.all(sql, (err, subjects) => {
            if (err) {
                return reject(err);
            }
            return resolve(subjects);
        });
    });
}

function deleteSubject(name) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM subject WHERE name = ?';
        db.run(sql, [name], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.changes);
        });
    });
}

// class related
function insertClass(name, year, grade, teacherNumber, subjectID) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO class (name, year, grade, teacherNumber, subjectID) VALUES(?, ?, ?, ?, ?)';
        db.run(sql, [name, year, grade, teacherNumber, subjectID], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.lastID);
        });
    });
}

function getClass(name, year, grade, teacherNumber, subjectID) {
    return new Promise((resolve, reject) => {
        if (!name & !year & !grade & !teacherNumber & !subjectID) {
            return reject('No input, use getAllClass instead');
        }
        let sql = 'SELECT * FROM class WHERE ';
        let values = [];
        if (name) {
            sql += 'name = ? AND ';
            values.push(name);
        }
        if (year) {
            sql += 'year = ? AND ';
            values.push(year);
        }
        if (grade) {
            sql += 'grade = ? AND ';
            values.push(grade);
        }
        if (teacherNumber) {
            sql += 'teacherNumber = ? AND ';
            values.push(teacherNumber);
        }
        if (subjectID) {
            sql += 'subjectID = ? AND ';
            values.push(subjectID);
        }
        sql = sql.substring(0, sql.length - 5);
        db.all(sql, values, (err, classes) => {
            if (err) {
                return reject(err);
            }
            return resolve(classes);
        });
    });
}

function getAllClass() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM class';
        db.all(sql, (err, classes) => {
            if (err) {
                return reject(err);
            }
            return resolve(classes);
        });
    });
}

function getClassName(classID) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name FROM class WHERE id = ?';
        db.get(sql, [classID], (err, mark) => {
            if (err) {
                return reject(err);
            }
            return resolve(mark);
        });
    });
}

function deleteClass(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM class WHERE id = ?';
        db.run(sql, [id], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.changes);
        });
    });
}

// mark related

function insertMark(name, mark, studentNumber, classID) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO mark (name, mark, studentNumber, classID) VALUES(?, ?, ?, ?)';
        db.run(sql, [name, mark, studentNumber, classID], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.lastID);
        });
    });
}

function getAllMark() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM mark';
        db.all(sql, (err, mark) => {
            if (err) {
                return reject(err);
            }
            return resolve(mark);
        });
    });
}

function getClassAvgMark(classID) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT AVG(mark) FROM mark WHERE classID = ?';
        db.get(sql, [classID], (err, mark) => {
            if (err) {
                return reject(err);
            }
            return resolve(mark);
        });
    });
}

function getStudentAvgMark(studentNumber) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT AVG(mark) FROM mark WHERE studentNumber = ?';
        db.get(sql, [studentNumber], (err, mark) => {
            if (err) {
                return reject(err);
            }
            return resolve(mark);
        });
    });
}

function getStudentAvgMarkByYear(studentNumber, year) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT AVG(mark) FROM mark WHERE studentNumber = ? AND year = ?';
        db.get(sql, [studentNumber, year], (err, mark) => {
            if (err) {
                return reject(err);
            }
            return resolve(mark);
        });
    });
}

function getClassMark(classID) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM mark WHERE classID = ?';
        db.all(sql, [classID], (err, mark) => {
            if (err) {
                return reject(err);
            }
            return resolve(mark);
        });
    });
}

function getStudentMarkByClass(studentNumber, classID) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name, mark FROM mark WHERE studentNumber = ? AND classID = ?';
        db.all(sql, [studentNumber, classID], (err, mark) => {
            if (err) {
                return reject(err);
            }
            return resolve(mark);
        });
    });
}


function getStudentMark(studentNumber) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT DISTINCT classID FROM mark WHERE studentNumber = ?';
        db.all(sql, [studentNumber], async function (err, classIDs) {
            if (err) {
                return reject(err);
            }
            let res = {};
            for (let i = 0; i < classIDs.length; i++) {
                let classID = classIDs[i].classID;
                let className = (await getClassName(classID)).name;
                let m = {};
                let mark = await getStudentMarkByClass(studentNumber, classID);
                for (let j = 0; j < mark.length; j++) {
                    m[mark[j].name] = mark[j].mark;
                }
                res[className] = m;
            }
            return resolve(res);
        });
    });
}

function getStudentMarksByYear(studentNumber, year) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT mark, classID FROM mark WHERE studentNumber = ? AND year = ?';
        db.all(sql, [studentNumber, year], (err, mark) => {
            if (err) {
                return reject(err);
            }
            return resolve(mark);
        });
    });
}

function getMarkNameByClass(classID) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT DISTINCT name FROM mark WHERE classID = ?';
        db.all(sql, [classID], (err, mark) => {
            if (err) {
                return reject(err);
            }
            return resolve(mark);
        });
    });
}


function deleteMark(studentNumber, classID) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM mark WHERE studentNumber = ? AND classID = ?';
        db.run(sql, [studentNumber, classID], function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(this.changes);
        });
    });
}

// Mixed
// TODO: optimize performance
function getStudentAndMarkByClass(classID) {
    return new Promise((resolve, reject) => {
        let res = [];
        let sql = 'SELECT DISTINCT studentNumber FROM mark WHERE classID = ?';
        db.all(sql, [classID], async (err, studentNumbers) => {
            if (err) {
                return reject(err);
            }
            for (let i = 0; i < studentNumbers.length; i++) {
                let studentNumber = studentNumbers[i].studentNumber;
                let studentMark = {};
                let student = await getStudent(studentNumber);
                studentMark['studentNumber'] = studentNumber;
                studentMark['studentName'] = student.name;
    
                let marks = await getStudentMarkByClass(studentNumber, classID);
                for (let j = 0; j < marks.length; j++) {
                    if (marks[j].name !== 'assign_class') {
                        studentMark[marks[j].name] = marks[j].mark;
                    }
                }
                res.push(studentMark);
            }
            return resolve(res);
        });
    });
}


module.exports = {
    // Database
    connectDB,
    disconnectDB,
    initDB,
    // User
    insertUser,
    getUser,
    getAllUser,
    checkUserPassword,
    deleteUser,
    updateUserPassword,
    updateUserTeacherNumber,
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
    getAllMark,
    getClassAvgMark,
    getStudentAvgMark,
    getStudentAvgMarkByYear,
    getClassMark,
    getStudentMark,
    getStudentMarksByYear,
    getMarkNameByClass,
    deleteMark,
    // Mixed
    getStudentAndMarkByClass,
};