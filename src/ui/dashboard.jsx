import React, { useState, useEffect } from 'react';
import '@emotion/styled';
import './styles.css';
import DataGridDemo from './datagrid.jsx';
import Buttons from './buttons.jsx';
import studentData from './dummy_data.json';


const Dashboard = ({classes, selectedClass}) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [saveStatus, setSaveStatus] = useState(null);

    useEffect(() => {
        const handleSaveDataResponse = (event, response) => {
            if (response.success) {
                console.log('Dashboard Data has been saved successfully:', response.id);
                setSaveStatus('Dashboard Data saved successfully.');
            } else {
                console.error('Error saving data:', response.error);
                setSaveStatus('Error saving data: ' + response.error);
            }
        };

        window.api.receive('save-data-response', handleSaveDataResponse);

        return () => {
            window.api.removeListener('save-data-response', handleSaveDataResponse);
        };
    }, []);

    const handleSaveData = (data) => {
        console.log('Data to save:', data);
        window.api.send('save-data', data);
    };

    return (
        <div>
            <h2>{classes[selectedClass].name}</h2>
            {saveStatus && <div>{saveStatus}</div>}

            <DataGridDemo
                selectedClass={selectedClass}
                onSaveData={handleSaveData}
            />

            <Buttons 
                onSaveDataClick={() => handleSaveData(studentData[selectedClass])}
            />
        </div>
    );
};

export default Dashboard;