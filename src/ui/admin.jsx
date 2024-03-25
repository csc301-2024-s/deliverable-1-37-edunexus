import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';

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
        window.api.send('insert-user', {username: username, password: password});
    };

    const handleAddStudent = () => {
        window.api.send('insert-student', {name: studentName, studentNumber: studentNumber, age: age});
        // TODO: Add response handling
        // response = window.api.receive('insert-student-response');
    }; 

    const handleAddClass = () => {
        window.api.send('insert-class', {name: className, year: year, grade: grade, teacherNumber: classTeacherNumber});
    };

    const handleAddTeacher = () => {
        window.api.send('insert-teacher', {name: teacherName, teacherNumber: teacherNumber});
    };

    return (
        <div>
            <h1>Admin Settings</h1>
            <Grid container spacing={2}>
                <Grid item>
                    <h2>Add User</h2>
                    <TextField
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <br />
                    
                    <TextField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <br />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleAddUser}>Add User
                    </Button>
                </Grid>

                <Grid item>
                    <h2>Add Teacher</h2>
                    <TextField
                        type="text"
                        placeholder="Name"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <br />
                    <TextField
                        type="text"
                        placeholder="Teacher number"
                        value={teacherNumber}
                        onChange={(e) => setTeacherNumber(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <br />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleAddTeacher}>Add Teacher
                    </Button>
                </Grid>

                <Grid item>
                    <h2>Add Student</h2>
                    <TextField
                        type="text"
                        placeholder="Name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <br />
                    <TextField
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <br />
                    <TextField
                        type="text"
                        placeholder="Student number"
                        value={studentNumber}
                        onChange={(e) => setStudentNumber(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />

                    <br />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleAddStudent}>Add Student
                    </Button>  
                </Grid>
                
                <Grid item>
                    <h2>Add Class</h2>
                    <TextField
                        type="text"
                        placeholder="Class Name"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <br />
                    <TextField
                        type="text"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <br />
                    <TextField
                        type="text"
                        placeholder="Grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <br />
                    <TextField
                        type="text"
                        placeholder="Teacher number"
                        value={classTeacherNumber}
                        onChange={(e) => setClassTeacherNumber(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <br />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleAddClass}>Add Class
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Admin;