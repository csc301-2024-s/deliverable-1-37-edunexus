import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';

function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [teacherNumber, setTeacherNumber] = useState('');
    const [studentName, setStudentName] = useState('');
    const [age, setAge] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [className, setClassName] = useState('');
    const [year, setYear] = useState('');
    const [grade, setGrade] = useState('');
    const [classTeacherNumber, setClassTeacherNumber] = useState('');

    // Success and Error states
    const [userAddSuccess, setUserAddSuccess] = useState('');
    const [userAddError, setUserAddError] = useState('');
    const [studentAddSuccess, setStudentAddSuccess] = useState('');
    const [studentAddError, setStudentAddError] = useState('');
    const [classAddSuccess, setClassAddSuccess] = useState('');
    const [classAddError, setClassAddError] = useState('');
    const [teacherAddSuccess, setTeacherAddSuccess] = useState('');
    const [teacherAddError, setTeacherAddError] = useState('');


    const handleAddUser = () => {
        const responseHandler = (response) => {
            if (response.error) {
                // Error occurred
                setUserAddError('Error adding user');
                setUserAddSuccess('');
            } else {
                // Object created successfully
                setUserAddSuccess('User added successfully');
                setUserAddError('');
            }
        };

        window.api.send('insert-user', {username: username, password: password});
        window.api.receive('insert-user-response', responseHandler);
        return () => {
            window.api.remove('insert-user-response', responseHandler);
        };
    };

    const handleAddStudent = () => {
        const responseHandler = (response) => {
            if (response.error) {
                // Error occurred
                setStudentAddError('Error adding student: student number is already used');
                setStudentAddSuccess('');
            } else {
                // Object created successfully
                setStudentAddSuccess('Student added successfully');
                setStudentAddError('');
            }
        };

        window.api.send('insert-student', {name: studentName, studentNumber: studentNumber, age: age});
        // TODO: Add response handling
        window.api.receive('insert-student-response', responseHandler);
        return () => {
            window.api.remove('insert-student-response', responseHandler);
        };
    }; 

    const handleAddClass = () => {
        const responseHandler = (response) => {
            if (response.error) {
                // Error occurred
                setClassAddError('Error adding class: teacher number is not valid');
                setClassAddSuccess('');
            } else {
                // Object created successfully
                setClassAddSuccess('Class added successfully');
                setClassAddError('');
            }
        };

        window.api.send('insert-class', {name: className, year: year, grade: grade, teacherNumber: classTeacherNumber});
        // TODO: Add response handling
        window.api.receive('insert-class-response', responseHandler);
        return () => {
            window.api.remove('insert-class-response', responseHandler);
        };
    };

    const handleAddTeacher = () => {
        const responseHandler = (response) => {
            if (response.error) {
                // Error occurred
                setTeacherAddError('Error adding teacher: teacher number is already used');
                setTeacherAddSuccess('');
            } else {
                // Object created successfully
                setTeacherAddSuccess('Teacher added successfully');
                setTeacherAddError('');
            }
        };

        window.api.send('insert-teacher', {name: teacherName, teacherNumber: teacherNumber});
        // TODO: Add response handling
        window.api.receive('insert-teacher-response', responseHandler);
        return () => {
            window.api.remove('insert-teacher-response', responseHandler);
        };
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
                    {userAddSuccess && <p style={{ color: 'green' }}>{userAddSuccess}</p>}
                    {userAddError && <p style={{ color: 'red' }}>{userAddError}</p>}
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
                    {teacherAddSuccess && <p style={{ color: 'green' }}>{teacherAddSuccess}</p>}
                    {teacherAddError && <p style={{ color: 'red' }}>{teacherAddError}</p>}
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
                    {studentAddSuccess && <p style={{ color: 'green' }}>{studentAddSuccess}</p>}
                    {studentAddError && <p style={{ color: 'red' }}>{studentAddError}</p>}
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
                    {classAddSuccess && <p style={{ color: 'green' }}>{classAddSuccess}</p>}
                    {classAddError && <p style={{ color: 'red' }}>{classAddError}</p>}
                </Grid>
            </Grid>
        </div>
    );
}

export default Admin;