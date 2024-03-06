import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '@emotion/styled';
import './styles.css'; 


function Buttons() {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
  
    return (
        <div className="buttons-container">
            <button onClick={togglePopup}>Upload a Spreadsheet</button>
            {showPopup && <PopupComponent onClose={togglePopup} />}

            {/* <button>Generate PDF</button> */}

            <Button variant="contained"
                onClick={() => {
                    window.api.send('request-report-generation', '1');
                    console.log('Report Generation was clicked');
                }}>Generate PDF</Button>

            <button>Visualize Class Statistics</button>
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
