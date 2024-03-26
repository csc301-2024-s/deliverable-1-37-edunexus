// const firstNames = [
//     'Aisha', 'Carlos', 'Mei', 'Ivan', 'Fatima', 'Santiago', 'Anika', 'Dmitri', 'Yara', 'Kenji',
//     'Sofia', 'Chen', 'Nadia', 'Raj', 'Lerato', 'Diego', 'Priya', 'Yuri', 'Jamila', 'Hiroshi',
//     'Amara', 'Alejandro', 'Ling', 'Mikhail', 'Zahra', 'Mateo', 'Aarav', 'Sergei', 'Amina', 'Takumi',
//     'Chioma', 'Juan', 'Huan', 'Vladimir', 'Layla', 'Pablo', 'Deepika', 'Fyodor', 'Noor', 'Ryu',
//     'Nia', 'Luis', 'Jia', 'Nikolai', 'Imani', 'Ricardo', 'Kavya', 'Igor', 'Samira', 'Shinji'
// ];
//
// const lastNames = [
//     'Kim', 'Patel', 'Nguyen', 'Garcia', 'Mohammed', 'Chen', 'Thapa', 'Fernandez', 'Hassan', 'Tanaka',
//     'Krishnan', 'Moreno', 'Wang', 'Khan', 'Perez', 'Singh', 'Rodriguez', 'Ali', 'Kumar', 'Suzuki',
//     'Gupta', 'Gonzalez', 'Zhang', 'Ahmed', 'Martinez', 'Shah', 'Lopez', 'Malik', 'Johansson', 'Sato',
//     'Diaz', 'Li', 'Hussain', 'Andersson', 'Sanchez', 'Mukherjee', 'Hernandez', 'Liu', 'Rahman', 'Nakamura',
//     'Ramirez', 'Xu', 'Iqbal', 'Lindberg', 'Rivera', 'Banerjee', 'Torres', 'Wei', 'Sheikh', 'Yamamoto'
// ];
//

const database = require(__dirname + '/database');
const names = ['Mary Melton', 'Cody Hill', 'Karen Hamilton', 'Robert Bradshaw', 'Jeremy Morrison', 'Angela Powell',
    'Tabitha Lawrence', 'Michelle Shaw', 'Raymond Clayton', 'Mr. Randall Hartman DDS', 'Kayla Larson', 'Richard Garza',
    'John Jimenez', 'Beverly Mcdonald', 'Kyle Ramirez', 'Cheyenne Landry', 'Andrew Knight', 'Lance Hernandez',
    'Austin Gamble', 'Scott Andrews DVM', 'Theresa Jones', 'Sonya Clark', 'Jay Navarro', 'Anthony Johnson', 'Joel Miller', 
    'Dr. Tamara Gardner', 'Christina Jenkins', 'Allison Johnson', 'Matthew Estrada', 'Angela Hernandez'];
const markNames = ['HW1', 'HW2', 'HW3', 'Test', 'Exam'];
const classNames = ['Math', 'English', 'Geography'];

async function init() {
    // initialize database
    await database.initDB();
    // User
    await database.insertUser('admin', 'password', 1, 101);
    // Teacher
    await database.insertTeacher('Default teacher 1', 101);
    await database.insertSubject('');
}

async function fillData() {
    let studentNumber, name, age;
    // Student
    for (let i = 0; i < names.length; i++) {
        studentNumber = i + 100;
        name = names[i];
        age = 12 + Math.floor(i / 10);
        await database.insertStudent(name, studentNumber, age);
    }
    for (let grade = 7; grade <= 9; grade++) {
        for (let i = 0; i < classNames.length; i++) {
            await database.insertClass(classNames[i] + ' grade ' + grade, 2024, grade, 101, 1);
        }
    }
    for (let i = 0; i < names.length; i++) {
        for (let j = 0; j < markNames.length; j++) {
            for (let k = 0; k < classNames.length; k++) {
                let markName = markNames[j];
                let mark = Math.floor(Math.random() * 50) + 50;
                let studentNumber = i + 100;
                let classID = Math.floor(i / 10) * 3 + k + 1;
                await database.insertMark(markName, mark, studentNumber, classID);
            }
        }
    }
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
    let marks = await database.getClassMark(5);
    console.log(marks);
}

async function main() {
    await database.connectDB('./edunexus.db');
    await init();
    await fillData();
    await printAll();
}

main();