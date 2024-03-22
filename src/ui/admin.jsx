import React, { useState } from 'react';

function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [studentName, setStudentName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [teacherNumber, setTeacherNumber] = useState('');
    const [age, setAge] = useState('');
    const [className, setClassName] = useState('');
    const [year, setYear] = useState('');
    const [grade, setGrade] = useState('');
    const [classTeacherNumber, setClassTeacherNumber] = useState('');

    const handleAddUser = () => {
        // Add user logic here
        window.api.send('insert-user', {username: username, password: password});
    };

    const handleAddStudent = () => {
        // Add student logic here
        window.api.send('insert-student', {name: studentName, studentNumber: studentNumber, age: age});
        // TODO: response does not work
        // response = window.api.receive('insert-student-response');
    }; 

    const handleAddClass = () => {
        // Add class logic here
        window.api.send('insert-class', {name: className, year: year, grade: grade, teacherNumber: classTeacherNumber});
    };

    const handleAddTeacher = () => {
        // Add teacher logic here
        window.api.send('insert-teacher', {name: teacherName, teacherNumber: teacherNumber});
    };

    return (
        <div>
            <h1>Admin Page</h1>

            <h2>Add User</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAddUser}>Add User</button>

            <h2>Add Student</h2>
            <input
                type="text"
                placeholder="Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Student number"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <button onClick={handleAddStudent}>Add Student</button>

            <h2>Add Class</h2>
            <input
                type="text"
                placeholder="Class Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <input
                type="text"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
            />
            <input
                type="text"
                placeholder="Teacher number"
                value={classTeacherNumber}
                onChange={(e) => setClassTeacherNumber(e.target.value)}
            />
            <button onClick={handleAddClass}>Add Class</button>

            <h2>Add Teacher</h2>
            <input
                type="text"
                placeholder="Name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Teacher number"
                value={teacherNumber}
                onChange={(e) => setTeacherNumber(e.target.value)}
            />
            <button onClick={handleAddTeacher}>Add Teacher</button>
        </div>
    );
}

export default Admin;