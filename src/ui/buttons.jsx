import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '@emotion/styled';
import './styles.css'; 

/**
 * `Buttons` is a React component that renders a set of buttons for uploading spreadsheets,
 * generating PDF reports, and visualizing class statistics. It also manages the state
 * for showing a popup component that provides instructions for uploading a spreadsheet.
 *
 * @returns {React.JSX.Element} The `Buttons` component renders three buttons with different functionalities
 * and a `PopupComponent` if the `showPopup` state is true.
 */
function Buttons() {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
  
    return (
        <div className="buttons-container" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button variant="outlined" style={{ color: '#76ABAE', borderColor: '#76ABAE' }}>
                Upload a Spreadsheet
            </Button>
            {showPopup && <PopupComponent onClose={togglePopup} />}

            {/* <button>Generate PDF</button> */}
            <Button variant="contained"
                onClick={() => {
                    const data = {studentId: '1', single: true};
                    window.api.send('request-report-generation', data);
                    console.log('Report Generation was clicked');
                }}
                style={{ backgroundColor: '#76ABAE', color: '#FFFFFF' }}>
                Generate PDF
            </Button>
            <Button variant="outlined" style={{ color: '#76ABAE', borderColor: '#76ABAE' }}>
                Visualize Class Statistics
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
