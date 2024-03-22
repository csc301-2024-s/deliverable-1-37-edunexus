const fs = require('fs');
const database = require(__dirname + '/../database');
const names = ['Mary Melton', 'Cody Hill', 'Karen Hamilton', 'Robert Bradshaw', 'Jeremy Morrison', 'Angela Powell',
    'Tabitha Lawrence', 'Michelle Shaw', 'Raymond Clayton', 'Mr. Randall Hartman DDS', 'Kayla Larson', 'Richard Garza',
    'John Jimenez', 'Beverly Mcdonald', 'Kyle Ramirez', 'Cheyenne Landry', 'Andrew Knight', 'Lance Hernandez',
    'Austin Gamble', 'Scott Andrews DVM', 'Theresa Jones', 'Sonya Clark', 'Jay Navarro', 'Anthony Johnson', 'Joel Miller', 
    'Dr. Tamara Gardner', 'Christina Jenkins', 'Allison Johnson', 'Matthew Estrada', 'Angela Hernandez'];
const markNames = ['HW1', 'HW2', 'HW3', 'Test', 'Exam'];
const classNames = ['Math', 'English', 'Geography'];

async function createDB() {
    let studentNumber, name, age;
    // Calls to insert
    // User
    // create admin account
    let adminPromise = database.insertUser('admin', 'password', 1);
    let userPromise = database.insertUser('user', 'password');
    // Student

    // Call to create multiple students
    let studentPromises = [];
    for (let i = 0; i < names.length; i++) {
        studentNumber = i + 100;
        name = names[i];
        age = 12 + Math.floor(i / 10);
        studentPromises.push(database.insertStudent(name, studentNumber, age));
    }
    // Call to create teacher and subject
    let teacherPromise = database.insertTeacher('', 101);
    let subjectPromise = database.insertSubject('');
    // Wait for teacher and subject creation to be finished
    await teacherPromise;
    await subjectPromise;

    let classPromises = [];
    for (let grade = 7; grade <= 9; grade++) {
        for (let i = 0; i < classNames.length; i++) {
            classPromises.push(database.insertClass(classNames[i] + ' grade ' + grade, 2024, grade, 101, 1));
        }
    }

    // wait for student creation
    await Promise.all(studentPromises);
    // wait for class creation
    await Promise.all(classPromises);

    let markPromises = [];
    // Call to create mark
    for (let i = 0; i < names.length; i++) {
        for (let j = 0; j < markNames.length; j++) {
            for (let k = 0; k < classNames.length; k++) {
                let markName = markNames[j];
                let mark = Math.floor(Math.random() * 50) + 50;
                let studentNumber = i + 100;
                let classID = Math.floor(i / 10) * 3 + k + 1;
                markPromises.push(database.insertMark(markName, mark, studentNumber, classID));
            }
        }
    }
    await adminPromise;
    await userPromise;
    await Promise.all(markPromises);
}

async function printAll() {
    let users = await database.getAllUser();
    console.log(users);
    let students = await database.getAllStudent();
    console.log(students);
    let teachers = await database.getAllTeacher();
    console.log(teachers);
    let subjects = await database.getAllSubject();
    console.log(subjects);
    let classes = await database.getAllClass();
    console.log(classes);
    let marks = await database.getClassMark(9);
    console.log(marks);
}

async function deleteDB() {
    await database.disconnectDB();
    try {
        fs.unlinkSync('./edunexus.db');
        console.log('File deleted');
    } catch (err) {
        // Handle specific error if any
        console.error(err.message);
    }
}

async function main() {
    await createDB();
    await printAll();
    deleteDB();
    // TODO: Add some test case
}

main();
