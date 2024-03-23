import React, { useState } from 'react';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import '@emotion/styled';
import './styles.css'; 


function Buttons({selectedRow, classData}) {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    console.log('this is in buttons', classData);
    
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
                onClick={() => {
                    // For now, we will only use the first element in the selectedRow array
                    // TODO: Handle multiple selected rows
                    const data = {studentId: selectedRow[0], single: true};
                    window.api.send('request-report-generation', data);
                    console.log('Report Generation was clicked');
                    console.log(data);
                }}
                style={{ backgroundColor: '#76ABAE', color: '#FFFFFF' }}>
                Generate PDF
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
