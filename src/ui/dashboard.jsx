import React from 'react';
import '@emotion/styled';
import './styles.css';
import DataGridDemo from "./datagrid.jsx";
import Buttons from "./buttons.jsx"; // Import your central stylesheet

const Dashboard = ({classes, selectedClass}) => {
    const className = classes[selectedClass].name;

    return (
        <div>
            <h2>{className}</h2>

            <DataGridDemo selectedClass={selectedClass}/>
            <Buttons />
        </div>
    );
}

export default Dashboard;