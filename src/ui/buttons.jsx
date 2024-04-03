import React, { useState } from 'react';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import '@emotion/styled';
import './styles.css';
import ClassStats from './classStats.jsx';

/**
 * `Buttons` is a React component that renders a set of buttons for uploading spreadsheets,
 * generating PDF reports, and visualizing class statistics. It also manages the state
 * for showing a popup component that provides instructions for uploading a spreadsheet.
 *
 * @returns {React.JSX.Element} The `Buttons` component renders three buttons with different functionalities
 * and a `PopupComponent` if the `showPopup` state is true.
 */
function Buttons({selectedRow, classData, className}) {

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const addAverageScoresToStudentData = (data) => {
        if (data.length === 0) return [];

        const totals = {};
        const counts = {};
        const examKeys = Object.keys(data[0]).slice(2);

        data.forEach(student => {
            examKeys.forEach(key => {
                /* eslint-disable */
                if (student.hasOwnProperty(key) && typeof student[key] === 'number') {
                    if (!totals[key]) {
                        totals[key] = 0;
                        counts[key] = 0;
                    }
                    totals[key] += student[key];
                    counts[key] += 1;
                }
            });
        });

        const averages = {};
        Object.keys(totals).forEach(test => {
            averages[test] = totals[test] / counts[test];
        });

        return data.map(student => {
            const updatedScores = {};
            Object.keys(student).forEach(key => {
                if (examKeys.includes(key)) {
                    updatedScores[key] = { score: student[key], average: averages[key] };
                } else {
                    updatedScores[key] = student[key];
                }
            });
            return updatedScores;
        });
    };

    function addTotalsAndAveragesToStudentData(data) {

        if (data.length === 0) return [];
    
        let classTotal = 0;
        let classCount = 0;
    
        const updatedData = data.map(student => {
            let studentTotal = 0;
            let studentCount = 0;
    
            Object.entries(student).forEach(([key, value]) => {
                if (typeof value === 'number') {
                    studentTotal += value;
                    studentCount += 1;
                } else if (value && typeof value.score === 'number') {
                    studentTotal += value.score;
                    studentCount += 1;
                }
            });

            const studentAverage = studentCount > 0 ? studentTotal / studentCount : 0;
            classTotal += studentTotal;
            classCount += studentCount;

            return {
                ...student,
                total: { studentTotal, classTotal },
                average: { studentAverage, classAverage: classCount > 0 ? classTotal / classCount : 0 }
            };
        });
    
        const classAverage = classCount > 0 ? classTotal / classCount : 0;
        return updatedData.map(student => ({
            ...student,
            total: { ...student.total, classTotal },
            average: { ...student.average, classAverage }
        }));
    }
    
    const filterStudentDetails = (data) => {

        return data.filter(studentDetail => selectedRow.includes(studentDetail.id));

    };

    const handleGenerateReports = () => {

        const dataWithAverages = addAverageScoresToStudentData(classData);

        const enrichedData = addTotalsAndAveragesToStudentData(dataWithAverages);
    
        const filteredAndEnrichedData = filterStudentDetails(enrichedData);

        const dataWithClassName = filteredAndEnrichedData.map(student => ({
            ...student,
            className: className
        }));

        window.api.send('request-report-generation', dataWithClassName);

    };

    const downloadExcel = () => {
        const processedData = classData.map(row => {

            const keys = Object.keys(row);

            const studentNumberKey = keys[0];
            const studentNameKey = keys[1];

            return {
                'Student ID': row[studentNumberKey],
                'Student Name': row[studentNameKey],
                'Next Exam/Test': ''
            };
        });
    
        const ws = XLSX.utils.json_to_sheet(processedData);
        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, 'CompleteData');
        XLSX.writeFile(wb, 'class_list.xlsx');
    };

    return (
        <div className="buttons-container" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>

            <Button 
                variant="contained" 
                style={{ backgroundColor: '#76ABAE', color: '#FFFFFF' }}>
                Upload Spreadsheet
            </Button>

            {showPopup && <PopupComponent onClose={togglePopup} />}

            <Button 
                variant="contained"
                onClick={handleGenerateReports}
                style={{ backgroundColor: '#76ABAE', color: '#FFFFFF' }}>
                Generate Report
            </Button>

            <ClassStats 
                className={className} 
                classData={classData}
            />

            <Button 
                variant="contained" 
                style={{ backgroundColor: '#76ABAE', color: '#FFFFFF' }} 
                onClick={downloadExcel}>
                Download Classlist
            </Button>
        </div> 
    );
}

/**
 * `PopupComponent` is a React component that displays a modal popup with instructions
 * for uploading a spreadsheet. It includes an input for file upload and a close button
 * to dismiss the popup.
 *
 * @param {Object} props - The props object for the `PopupComponent`.
 * @param {Function} props.onClose - A function to call when the popup should be closed.
 * @returns {React.JSX.Element} The `PopupComponent` renders a modal with instructions and a file input.
 */
function PopupComponent({ onClose }) {
    return (
        <div className="popup">
            <div className="instructions-container">
                <h2>Instructions:</h2>
                <p>Please ensure that your spreadsheet is in the correct format:</p>
                <ol>
                    <li>The first row should contain the Student&apos;s Name, ID, and any assignments given.</li>
                    <li>Corresponding data should be inputted in the subsequent rows.</li>
                    <li>Click &quot;Choose File&quot; below to upload your spreadsheet.</li>
                    <li>Once a spreadsheet has been uploaded, click &quot;Generate PDF&quot; to process the file into a PDF.</li>
                </ol>
            </div>
            <input type="file" />
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default Buttons;
