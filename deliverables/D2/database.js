const sqlite3 = require('sqlite3').verbose();

// Create a new database if it does not exist, and open database for read and write
let db = new sqlite3.Database('./edunexus.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error(err.message);
  }
});

// Create tables if not created
db.parallelize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS student (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          integer NOT NULL
          )`)
    .run(`CREATE TABLE IF NOT EXISTS teacher (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
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
});
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS class (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          year INTEGER NOT NULL,
          grade INTEGER NOT NULL,
          teacher_id INTEGER REFERENCES teacher (id),
          subject_id INTEGER REFERENCES subject (id)
          )`)
    .run(`CREATE TABLE IF NOT EXISTS mark (
          mark INTEGER NOT NULL,
          student_id INTEGER REFERENCES student (id),
          class_id INTEGER REFERENCES class (id),
          PRIMARY KEY (student_id, class_id)
          )`)
});

// TODO: translate those into normal function
// app.get('/check_username', function (req, res) {
//   username = req.query.username;
//   db.run(`SELECT username FROM TABLE user WHERE username = ?`, [username], function(err) {
//     if (err) {
//       return console.log(err.message);
//     }
//     console.log(res)
//     return res;
//   });
//   // console.log(response);
//   // res.end(JSON.stringify(response));
// });

// app.put('/create_user', urlencodedParser, function (req, res) {
//   // Prepare output in JSON format
//   username = req.query.username;
//   password = req.query.password;
//   db.run(`INSERT INTO TABLE user (name, password) VALUES(?, ?)`, [username, password], function(err) {
//     if (err) {
//       return console.log(err.message);
//     }
//     console.log(`A user has been inserted with username ${username}`);
//     return res;
//   });
//   // console.log(response);
//   // res.end(JSON.stringify(response));
// });

db.close((err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Close the database connection.');
})