# Implementation of EduNexus Database

The database stores all of the student, teacher, and school information

## Files:
- `createTestDb.js` includes methods to create a test database for testing
- `database.js` implements the EduNexus database

## Database structure
<img src="./image/database.png">

### user

- Login information
    - username: username for login
    - password: password for login
    - admin: the account is admin or not, 1 if true and 0 if false
    - teacherNumber: teacher number of the teacher that own the account

### student

- Students' personal informations
- Unique to each student
    - studentNumber: A unique student number for identifying purposes
    - name: student's full name
    - age: student's age

### teacher

- Informations of teachers
- Unique to each teacher
    - name: teacher's name

### subject

- Informations of subjects
- Unique to each subject
    - name: subject name, unique and can be used for indentification

### class

- Informations of classes (or courses)
- Unique to each class, same class in different year is unique
    - name: name of the class
    - year: the year when the class is active
    - grade: the grade level of the class
    - teacheNumber: teacher number of the teacher, can be used to obtain teacher information
    - subjectID: id of the subject, can be used to obtain subject information

### mark

- Student's mark on one assignment/test etc.
- Unique to each student on each assignment on each class
    - each student should have a different mark for different assignment
    - each assignment name should be unique to its class
- each class is an new object for student
    - name: assignment's name
    - mark: student's mark on one assignment
    - studentNumber: student number of the student, can be used to obtain student information
    - classID: id of the class, can be used to obtain class information
    - name, studentNumber and classID together form a unique key and can be used for identification

## Functions
### User related
- `insertUser(username, password)` - Create new user instance
- `checkUserPassword()` - check user password, returns true/false
- `updateUserPassword(username, password)` - update user password, no check is performed
### Student related
- `insertStudent(studentNumber, name, age)` - Create new student instance
- `getStudent(studentNumber)` - get student by studet number, returns: 
```
{
    studentNumber: integer,
    name: string,
    age: integer
}
```
- `getStudentByClass(classID)` - filter student with class, returns:
```
[
    {
        studentNumber: integer,
        name: string,
        age: integer
    },
    ...
]
```
### Class related
- `insertClass(name, year, grade, teacherNumber, subjectID)` - Create new class instance
- `getAllClass()` - get all Class instances, returns:
```
[
    {
        name: string,
        year: integer,
        grade: integer,
        teacherNumber: integer,
        subjectID: integer
    }
]
```
### Mark related
- `insertMark(name, mark, studentNumber, classID)` - Create new mark instance
- `getStudentMark(studentNumber)` - get all the student's mark in a different format, returns:
```
{
    courseName: {markName: integer, ...}, // integer is mark
    ...
}
```

### Mixed
- `getStudentAndMarkByClass(classID)` - get all the student's info and marks, returns:
```
[
    {
        studentNumber: integer,
        studentName: string,
        markName1: integer,
        markName2: integer,
        ...
    },
    ...
]
```
