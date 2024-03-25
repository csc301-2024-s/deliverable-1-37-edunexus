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

/**
 * Requests the marks of a student by their student number and updates the state with these marks.
 * @param {string} studentNumber - The unique identifier for the student.
 * @param {function} setStudentMarks - Callback function to set the student's marks in the state.
 */

function getStudentMarkByStudentNumber(studentNumber, setStudentMarks) {
    window.api.send('get-student-marks', studentNumber);

    window.api.receive('get-student-marks-response', (data) => {
        console.log(data);
        setStudentMarks(data);
        return data;
    });
}

/**
 * Asynchronously requests the name of a student by their student number and updates the state with this name.
 * @param {string} studentNumber - The unique identifier for the student.
 * @param {function} setStudentName - Callback function to set the student's name in the state.
 */
async function getStudentName(studentNumber, setStudentName) {
    window.api.send('get-student', studentNumber);

    window.api.receive('get-student-response', (data) => {
        setStudentName(data.name);
        return data.name;
    });
}

/**
 * Represents a draggable Paper component.
 * @param {object} props - The properties passed to the Paper component.
 * @returns {React.Element} A Draggable Paper component.
 */
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

/**
 * Retrieves the list of courses from the student data.
 * @param {object} studentData - The data containing information about a student's courses.
 * @returns {string[]} An array of course names.
 */
function getCourses(studentData) {
    return Object.keys(studentData);
}

/**
 * Retrieves the list of exams for a given course from the student data.
 * @param {object} studentData - The data containing information about a student's courses and exams.
 * @param {string} course - The name of the course to get the exams for.
 * @returns {string[]} An array of exam names.
 */
function getExams(studentData, course) {
    return Object.keys(studentData[course]);
}

/**
 * Retrieves all the marks for a given course from the student data.
 * @param {object} studentData - The data containing information about a student's courses and marks.
 * @param {string} course - The name of the course to get the marks for.
 * @returns {number[]} An array of marks for the specified course.
 */
function getMarks(studentData, course) {
    return Object.values(studentData[course]);
}


/**
 * Component to display student information and marks in a dialog.
 *
 * This component renders a button which, when clicked, opens a dialog displaying
 * the student's name, subjects, and marks as a list and graphical bar chart representation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.studentNumber - The student number used to fetch and display student data.
 */
export default function StudentInfo(props) {
    const { studentNumber } = props;
    const [open, setOpen] = React.useState(false);
    const [studentName, setStudentName] = React.useState('');
    const [studentData, setStudentMarks] = React.useState({});

    /**
     * Handles the click event to open the dialog.
     * Fetches the student's name and marks using the provided student number.
     */
    const handleClickOpen = () => {
        setOpen(true);
        getStudentName(studentNumber, setStudentName).then(_ => {_;});
        getStudentMarkByStudentNumber(studentNumber, setStudentMarks);
    };

    /**
     * Handles the close event of the dialog.
     */
    const handleClose = () => {
        setOpen(false);
    };

    // Constants for display configuration
    const numCoursesPerColumn = 5;
    const graphWidth = 400;
    const graphHeight = 400;

    return (
        <React.Fragment>
            <Button style={{ justifyContent: 'flex-start' }} variant="text" size='small' onClick={handleClickOpen}id='studentInfoBtn'>
                {studentNumber}
            </Button>
            <Dialog id='studentInfoPopup'
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
                            return (<div key={index}>
                                <div>
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
                            </div>
                            );
                        })
                        }
                    </DialogContentText>

                    <DialogContentText>
                        {getCourses(studentData).slice(0, numCoursesPerColumn).map((course, index) => {
                            return (<div key={index}>
                                <div >
                                    <Typography variant="h6" align='center' component={'div'} sx={{ marginBottom: -5 }}>
                                        {course}
                                    </Typography>
                                    <BarChart
                                        xAxis={[{ scaleType: 'band', data: getExams(studentData, course) }]}
                                        series={[{ data: getMarks(studentData, course), type: 'bar', title: 'Math' }]}
                                        width={graphWidth}
                                        height={graphHeight} />
                                </div>
                            </div>
                            );
                        })}

                    </DialogContentText>
                    <DialogContentText>
                        {getCourses(studentData).slice(numCoursesPerColumn).map((course, index) => {
                            return (<div key={index}>
                                <div>
                                    <Typography variant="h6" align='center' component={'div'} sx={{ marginBottom: -5 }}>
                                        {course}
                                    </Typography>
                                    <BarChart
                                        xAxis={[{ scaleType: 'band', data: getExams(studentData, course) }]}
                                        series={[{ data: getMarks(studentData, course), type: 'bar', title: 'Math' }]}
                                        width={graphWidth}
                                        height={graphHeight} />
                                </div>
                            </div>

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