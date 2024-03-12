import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
// import getStudentMarkByStudentNumber from ;
// import getStudent
// import { getStudent } from '../database/database';

function getStudentMarkByStudentNumber(studentNumber) {
    return {
        'English': {
            'Exam 1': 70, 'Exam 2': 80
        },
        'Math': {
            'Exam 1': 100, 'Exam 2': 90, 'Assignment 1': 30
        },
        'Science': {
            'Exam 1': 80, 'Exam 2': 90
        },
        'History': {
            'Exam 1': 90, 'Exam 2': 100
        },
        'Art': {
            'Exam 1': 100, 'Exam 2': 100
        },
        'Physical Education': {
            'Exam 1': 100, 'Exam 2': 100
        },
        'Music': {
            'Exam 1': 100, 'Exam 2': 100
        },
        'Drama': {
            'Exam 1': 100, 'Exam 2': 100
        }
    };
}

function getStudent(studentNumber) {
    return 'John Doe';
}

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

function getCourses(studentData) {
    return Object.keys(studentData);
}

function getExams(studentData, course) {
    return Object.keys(studentData[course]);
}

// Return all the marks for a given course.
function getMarks(studentData, course) {
    return Object.values(studentData[course]);
}



export default function StudentInfo(props) {
    const { studentNumber } = props;
    const [open, setOpen] = React.useState(false);
    const studentData = getStudentMarkByStudentNumber(studentNumber);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const numCourses = Object.keys(studentData).length;
    const numCoursesPerColumn = 5;
    const graphWidth = 300;
    const graphHeight = 200;

    return (
        <React.Fragment>
            <Button style={{ justifyContent: 'flex-start' }} variant="text" size='small' onClick={handleClickOpen}>
                {studentNumber}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                fullWidth={true}
                maxWidth='xl'
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {studentNumber} - {getStudent(studentNumber)}
                </DialogTitle>
                <DialogContent dividers={true} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <DialogContentText>
                        {Object.keys(studentData).map((subject, index) => {
                            return (<>
                                <div key={index}>
                                    <h3>{subject}</h3>
                                    <ul>
                                        {Object.keys(studentData[subject]).map((exam, index) => {
                                            return (
                                                <li key={index}>
                                                    {exam}: {studentData[subject][exam]}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </>
                            );
                        })
                        }
                    </DialogContentText>

                    <DialogContentText>
                        {getCourses(studentData).slice(0, numCoursesPerColumn).map((course, index) => {
                            return (<>
                                <div key={index}>
                                    <Typography variant="h6" align='center' component={'div'} sx={{ marginBottom: -5 }}>
                                        {course}
                                    </Typography>
                                    <BarChart
                                        xAxis={[{ scaleType: 'band', data: getExams(studentData, course) }]}
                                        series={[{ data: getMarks(studentData, course), type: 'bar', title: 'Math' }]}
                                        width={graphWidth}
                                        height={graphHeight} />
                                </div>
                            </>
                            );
                        })}

                        {/* <Typography variant="h6" gutterBottom={false} align='center'>
              Math
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Exam 1', 'Exam 2', 'Assignment 1'] }]}
              series={[{ data: [100, 30, 50], type: 'bar', title: 'Math' }]}
              width={500}
              height={300}
            /> */}
                    </DialogContentText>
                    <DialogContentText>
                        {getCourses(studentData).slice(numCoursesPerColumn).map((course, index) => {
                            return (<>
                                <div key={index}>
                                    <Typography variant="h6" align='center' component={'div'} sx={{ marginBottom: -5 }}>
                                        {course}
                                    </Typography>
                                    <BarChart
                                        xAxis={[{ scaleType: 'band', data: getExams(studentData, course) }]}
                                        series={[{ data: getMarks(studentData, course), type: 'bar', title: 'Math' }]}
                                        width={graphWidth}
                                        height={graphHeight} /> 
                                </div>
                            </>

                            );
                        })};

                        {/* <Typography variant="h6" gutterBottom={false} align='center'>
              Math
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Exam 1', 'Exam 2', 'Assignment 1'] }]}
              series={[{ data: [100, 30, 50], type: 'bar', title: 'Math' }]}
              width={500}
              height={300}
            /> */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}