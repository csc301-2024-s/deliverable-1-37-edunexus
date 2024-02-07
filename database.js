const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database if it does not exist, and open database for read and write
let db = new sqlite3.Database('./database/edunexus.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables
db.parallelize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS student (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          integer NOT NULL
          )`)
    .run(`CREATE TABLE IF NOT EXISTS teacher (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL
          )`)
    .run(`CREATE TABLE IF NOT EXISTS subject (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          abbreviation TEXT NOT NULL
          )`)
    .run(`PRAGMA foreign_keys = ON`)
})
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS class (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          teacher_id INTEGER REFERENCES teacher (id),
          year INTEGER NOT NULL,
          subject_id INTEGER REFERENCES subject (id)
          )`)
    .run(`CREATE TABLE IF NOT EXISTS mark (
          mark INTEGER,
          student_id INTEGER REFERNCES student (id),
          class_id INTEGER REFERENCES class (id),
          PRIMARY KEY (student_id, class_id)
          )`)
})


db.close((err) => {
  if (err) {
    return console.error(err.message)
  }
})