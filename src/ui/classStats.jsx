import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {BarChart} from '@mui/x-charts/BarChart';



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



const getAverage = (classData) => {
    const exams = classData.map(row => {
        const value = Object.values(row);
        return value.slice(2);
    });

    const result = [];
    for (let i = 0; i < exams[0]?.length; i++) {
        let sum = 0;
        for (let j = 0; j < exams?.length; j++) {
            sum += exams[j][i];
        }
        result.push(sum / exams?.length);
    }
    result?.unshift(result?.pop());
    return result;
};

const getMedian = (classData) => {
    const exams = classData.map(row => {
        const value = Object.values(row);
        return value.slice(2);
    });

    const result = [];
    for (let i = 0; i < exams[0]?.length; i++) {
        const median = exams.map(row => row[i]).sort((a, b) => a - b)[Math.floor(exams.length / 2)];
        result.push(median);
    }
    result?.unshift(result?.pop());
    return result;
};

const getMin= (classData) => {
    const exams = classData.map(row => {
        const value = Object.values(row);
        return value.slice(2);
    });

    const result = [];
    for (let i = 0; i < exams[0]?.length; i++) {
        const min = Math.min(...exams.map(row => row[i]));
        result.push(min);
    }
    result?.unshift(result?.pop());
    return result;
};

const getMax= (classData) => {
    const exams = classData.map(row => {
        const value = Object.values(row);
        return value.slice(2);
    });

    const result = [];
    for (let i = 0; i < exams[0]?.length; i++) {
        const max = Math.max(...exams.map(row => row[i]));
        result.push(max);
    }
    result?.unshift(result?.pop());
    return result;
};

export default function ClassStats({classData, className}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getExams = () => {
        const exams = classData.map(row => {
            const keys = Object.keys(row);
            return keys.slice(2).sort();
        });
        return exams[0];
    };



    const graphWidth = 1000;
    const graphHeight = 600;

    return (
        <React.Fragment>
            <Button  style={{ backgroundColor: '#76ABAE', color: '#FFFFFF' }} variant="contained" size='small' onClick={handleClickOpen}>
                Visualize Class Statistics
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
                    {className} - Class Statistics
                </DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText sx={{display: 'flex', justifyContent: 'center'}}>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: getExams()}]}
                            series={[
                                { data: getMin(classData), type: 'bar', color: '#FF3434', label: 'Min'},
                                { data: getMax(classData), type: 'bar', color: '#3475FF', label: 'Max'},
                                { data: getAverage(classData), type: 'bar', color: '#661AFD', label: 'Average'},
                                { data: getMedian(classData), type: 'bar', color: '#FFC134', label: 'Median'},
                            ]}
                            width={graphWidth}
                            height={graphHeight}
                            layout="vertical"
                            grid={{ horizontal: true }}
                        />
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