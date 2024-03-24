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


function getStudentMarkByStudentNumber(studentNumber, setStudentMarks) {
    window.api.send('get-student-marks', studentNumber);

    window.api.receive('get-student-marks-response', (data) => {
        setStudentMarks(data);
        return data;
    });
}

async function getStudentName(studentNumber, setStudentName) {
    window.api.send('get-student', studentNumber);

    window.api.receive('get-student-response', (data) => {
        setStudentName(data.name);
        return data.name;
    });
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
    // const studentData = getStudentMarkByStudentNumber(studentNumber);
    const [studentName, setStudentName] = React.useState('');
    const [studentData, setStudentMarks] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
        getStudentName(studentNumber, setStudentName);
        getStudentMarkByStudentNumber(studentNumber, setStudentMarks);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const numCoursesPerColumn = 5;
    const graphWidth = 400;
    const graphHeight = 400;

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
                    {studentNumber} - { studentName }
                </DialogTitle>
                <DialogContent dividers={true} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <DialogContentText>
                        {Object.keys(studentData).map((subject, index) => {
                            return (<>
                                <div key={index}>
                                    <h3 style={{textAlign: 'center'}}>{subject}</h3>
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
                        })}

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