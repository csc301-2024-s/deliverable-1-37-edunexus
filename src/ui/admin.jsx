import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, TextField, Grid} from '@mui/material';

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
    const [deleteUsername, setDeleteUsername] = useState('');
    const [deleteStudentNumber, setDeleteStudentNumber] = useState('');
    const [deleteTeacherNumber, setDeleteTeacherNumber] = useState('');
    const [deleteClassID, setDeleteClassID] = useState('');
    const [classNumber, setClassNumber] = useState('');
    const [classStudentNumber, setClassStudentNumber] = useState('');

    // Success and Error states
    const [userAddSuccess, setUserAddSuccess] = useState('');
    const [userAddError, setUserAddError] = useState('');
    const [studentAddSuccess, setStudentAddSuccess] = useState('');
    const [studentAddError, setStudentAddError] = useState('');
    const [classAddSuccess, setClassAddSuccess] = useState('');
    const [classAddError, setClassAddError] = useState('');
    const [teacherAddSuccess, setTeacherAddSuccess] = useState('');
    const [teacherAddError, setTeacherAddError] = useState('');
    const [classAddStudentSuccess, setClassAddStudentSuccess] = useState('');
    const [classAddStudentError, setClassAddStudentError] = useState('');

    const [userDeleteSuccess, setUserDeleteSuccess] = useState('');
    const [userDeleteError, setUserDeleteError] = useState('');
    const [studentDeleteSuccess, setStudentDeleteSuccess] = useState('');
    const [studentDeleteError, setStudentDeleteError] = useState('');
    const [classDeleteSuccess, setClassDeleteSuccess] = useState('');
    const [classDeleteError, setClassDeleteError] = useState('');
    const [teacherDeleteSuccess, setTeacherDeleteSuccess] = useState('');
    const [teacherDeleteError, setTeacherDeleteError] = useState('');

    const navigate = useNavigate();

    const handleAddUser = () => {
        const responseHandler = (response) => {
            if (response.error) {
                // Error occurred
                setUserAddError('Error adding user: username is already used');
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
        window.api.receive('insert-teacher-response', responseHandler);
        return () => {
            window.api.remove('insert-teacher-response', responseHandler);
        };
    };

    const handleAddStudentToClass = () => {
        const responseHandler = (response) => {
            if (response.error) {
                setClassAddStudentError('Error adding student to class. Please try again');
                setClassAddStudentSuccess('');
            } else {
                setClassAddStudentError('');
                setClassAddStudentSuccess('Student added to class successfully');
            }
        };

        window.api.send('insert-student-to-class', {classNumber: classNumber, classStudentNumber: classStudentNumber});
        const remove_listener = window.api.recieve('insert-student-to-class-response', responseHandler);

        return () => {
            remove_listener();
        };
    };

    const handleDeleteUser = () => {
        const responseHandler = (response) => {
            if (response.error) {
                // Error occurred
                setUserDeleteError('Error deleteing user');
                setUserDeleteSuccess('');
            } else if (!response) {
                // Error occurred
                setUserDeleteError('Error deleteing user: username not found');
                setUserDeleteSuccess('');
            } else {
                // Object created successfully
                setUserDeleteSuccess('User deleted successfully');
                setUserDeleteError('');
            }
        };

        window.api.send('delete-user', {username: deleteUsername});
        window.api.receive('delete-user-response', responseHandler);
        return () => {
            window.api.remove('delete-user-response', responseHandler);
        };
    };


    const handleDeleteStudent = () => {
        const responseHandler = (response) => {
            if (response.error) {
                // Error occurred
                setStudentDeleteError('Error deleteing student');
                setStudentDeleteSuccess('');
            } else if (!response) {
                // Error occurred
                setStudentDeleteError('Error deleteing student: student number not found');
                setStudentDeleteSuccess('');
            } else {
                // Object created successfully
                setStudentDeleteSuccess('Student deleted successfully');
                setStudentDeleteError('');
            }
        };

        window.api.send('delete-student', {studentNumber: deleteStudentNumber});
        window.api.receive('delete-student-response', responseHandler);
        return () => {
            window.api.remove('delete-student-response', responseHandler);
        };
    };

    const handleDeleteClass = () => {
        const responseHandler = (response) => {
            if (response.error) {
                // Error occurred
                setClassDeleteError('Error deleteing class');
                setClassDeleteSuccess('');
            } else if (!response) {
                // Error occurred
                setClassDeleteError('Error deleteing class: class ID not found');
                setClassDeleteSuccess('');
            } else {
                // Object created successfully
                setClassDeleteSuccess('Class deleted successfully');
                setClassDeleteError('');
            }
        };

        window.api.send('delete-class', {id: deleteClassID});
        window.api.receive('delete-class-response', responseHandler);
        return () => {
            window.api.remove('delete-class-response', responseHandler);
        };
    };

    const handleDeleteTeacher = () => {
        const responseHandler = (response) => {
            if (response.error) {
                // Error occurred
                setTeacherDeleteError('Error deleteing teacher');
                setTeacherDeleteSuccess('');
            } else if (!response) {
                // Error occurred
                setTeacherDeleteError('Error deleteing teacher: teacher number not found');
                setTeacherDeleteSuccess('');
            } else {
                // Object created successfully
                setTeacherDeleteSuccess('Teacher deleted successfully');
                setTeacherDeleteError('');
            }
        };

        window.api.send('delete-teacher', {teacherNumber: deleteTeacherNumber});
        window.api.receive('delete-teacher-response', responseHandler);
        return () => {
            window.api.remove('delete-teacher-response', responseHandler);
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
                        sx={{marginBottom: 1}}
                    />
                    <br/>

                    <TextField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleAddUser}>Add User
                    </Button>
                    {userAddSuccess && <p style={{color: 'green'}}>{userAddSuccess}</p>}
                    {userAddError && <p style={{color: 'red'}}>{userAddError}</p>}
                </Grid>

                <Grid item>
                    <h2>Add Teacher</h2>
                    <TextField
                        type="text"
                        placeholder="Name"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <TextField
                        type="text"
                        placeholder="Teacher number"
                        value={teacherNumber}
                        onChange={(e) => setTeacherNumber(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleAddTeacher}>Add Teacher
                    </Button>
                    {teacherAddSuccess && <p style={{color: 'green'}}>{teacherAddSuccess}</p>}
                    {teacherAddError && <p style={{color: 'red'}}>{teacherAddError}</p>}
                </Grid>

                <Grid item>
                    <h2>Add Student</h2>
                    <TextField
                        type="text"
                        placeholder="Name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <TextField
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <TextField
                        type="text"
                        placeholder="Student number"
                        value={studentNumber}
                        onChange={(e) => setStudentNumber(e.target.value)}
                        sx={{marginBottom: 1}}
                    />

                    <br/>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleAddStudent}>Add Student
                    </Button>
                    {studentAddSuccess && <p style={{color: 'green'}}>{studentAddSuccess}</p>}
                    {studentAddError && <p style={{color: 'red'}}>{studentAddError}</p>}
                </Grid>

                <Grid item>
                    <h2>Add Class</h2>
                    <TextField
                        type="text"
                        placeholder="Class Name"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <TextField
                        type="text"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <TextField
                        type="text"
                        placeholder="Grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <TextField
                        type="text"
                        placeholder="Teacher number"
                        value={classTeacherNumber}
                        onChange={(e) => setClassTeacherNumber(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleAddClass}>Add Class
                    </Button>
                    {classAddSuccess && <p style={{color: 'green'}}>{classAddSuccess}</p>}
                    {classAddError && <p style={{color: 'red'}}>{classAddError}</p>}
                </Grid>


                <Grid item>
                    <h2>Add Student To Class</h2>
                    <TextField
                        type="text"
                        placeholder="Class Number"
                        value={classNumber}
                        onChange={(e) => setClassNumber(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <br/>
                    <TextField
                        type="text"
                        placeholder="Student number"
                        value={classStudentNumber}
                        onChange={(e) => setClassStudentNumber(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleAddStudentToClass}>Add Class
                    </Button>
                    {classAddStudentSuccess && <p style={{color: 'green'}}>{classAddStudentSuccess}</p>}
                    {classAddStudentError && <p style={{color: 'red'}}>{classAddStudentError}</p>}
                </Grid>

                <Grid item>
                    <h2>Delete User</h2>
                    <TextField
                        type="text"
                        placeholder="Username"
                        value={deleteUsername}
                        onChange={(e) => setDeleteUsername(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleDeleteUser}>Delete User
                    </Button>
                    {userDeleteSuccess && <p style={{color: 'green'}}>{userDeleteSuccess}</p>}
                    {userDeleteError && <p style={{color: 'red'}}>{userDeleteError}</p>}
                </Grid>

                <Grid item>
                    <h2>Delete Teacher</h2>
                    <TextField
                        type="text"
                        placeholder="Teacher number"
                        value={deleteTeacherNumber}
                        onChange={(e) => setDeleteTeacherNumber(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleDeleteTeacher}>Delete Teacher
                    </Button>
                    {teacherDeleteSuccess && <p style={{color: 'green'}}>{teacherDeleteSuccess}</p>}
                    {teacherDeleteError && <p style={{color: 'red'}}>{teacherDeleteError}</p>}
                </Grid>

                <Grid item>
                    <h2>Delete Student</h2>
                    <TextField
                        type="text"
                        placeholder="Student number"
                        value={deleteStudentNumber}
                        onChange={(e) => setDeleteStudentNumber(e.target.value)}
                        sx={{marginBottom: 1}}
                    />

                    <br/>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleDeleteStudent}>Delete Student
                    </Button>
                    {studentDeleteSuccess && <p style={{color: 'green'}}>{studentDeleteSuccess}</p>}
                    {studentDeleteError && <p style={{color: 'red'}}>{studentDeleteError}</p>}
                </Grid>

                <Grid item>
                    <h2>Delete Class</h2>
                    <TextField
                        type="text"
                        placeholder="Class ID"
                        value={deleteClassID}
                        onChange={(e) => setDeleteClassID(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <br/>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                        onClick={handleDeleteClass}>Delete Class
                    </Button>
                    {classDeleteSuccess && <p style={{color: 'green'}}>{classDeleteSuccess}</p>}
                    {classDeleteError && <p style={{color: 'red'}}>{classDeleteError}</p>}
                </Grid>
            </Grid>
            <Button
                variant="contained"
                style={{backgroundColor: '#76ABAE', color: '#EEEEEE', marginTop: 10}}
                onClick={() => navigate('/dashboard')}
            > Exit Admin
            </Button>
        </div>
    );
}

export default Admin;