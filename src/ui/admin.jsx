import React, { useState } from 'react';

function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [className, setClassName] = useState('');
    const [year, setYear] = useState('');
    const [grade, setGrade] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [subjectId, setSubjectId] = useState('');

    const handleAddUser = () => {
        // Add user logic here
    };

    const handleAddStudent = () => {
        // Add student logic here
    };

    const handleAddClass = () => {
        // Add class logic here
    };

    const handleAddTeacher = () => {
        // Add teacher logic here
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="Teacher ID"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Subject ID"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
            />
            <button onClick={handleAddClass}>Add Class</button>

            <h2>Add Teacher</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleAddTeacher}>Add Teacher</button>
        </div>
    );
}

export default Admin;