import React, { useState } from 'react';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import '@emotion/styled';
import './styles.css'; 

/**
 * This is a React functional component that renders a set of buttons.
 * It uses the useState hook to manage the state of the component.
 * The component also imports Button from '@mui/material/Button' and XLSX from 'xlsx'.
 * It also imports '@emotion/styled' and './styles.css'.
 */
function Buttons({selectedRow, classData}) {
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

    /**
     * This function adds totals and averages to the student data.
     * @param {Array} data - The student data to be processed.
     * @returns {Array} - The student data with added totals and averages.
     */
    function addTotalsAndAveragesToStudentData(data) {
        if (data.length === 0) return [];
    
        let classTotal = 0;
        let classCount = 0;
    
        const updatedData = data.map(student => {
            let studentTotal = 0;
            let studentCount = 0;
    
            Object.entries(student).slice(2, -2).forEach(([key, value]) => {
                if (key !== 'unusedKey' && value && typeof value.score === 'number') {
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

        console.log('Sending filtered and enriched student data for report generation:', filteredAndEnrichedData);

        window.api.send('request-report-generation', filteredAndEnrichedData);
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
    
        console.log('Processed Data for Excel:', processedData);
    
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
                Upload a Spreadsheet
            </Button>

            {showPopup && <PopupComponent onClose={togglePopup} />}

            <Button variant="contained"
                onClick={handleGenerateReports}
                style={{ backgroundColor: '#76ABAE', color: '#FFFFFF' }}>
                Generate Reports
            </Button>

            <Button 
                variant="contained" 
                style={{ backgroundColor: '#76ABAE', color: '#FFFFFF' }}>
                Visualize Class Statistics
            </Button>

            <Button 
                variant="contained" 
                style={{ backgroundColor: '#76ABAE', color: '#FFFFFF' }} 
                onClick={downloadExcel}>
                Download Class List
            </Button>
        </div> 
    );
}

/**
 * This is a docstring for the function.
 * It describes the purpose of the function, its parameters, and its return value.
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
