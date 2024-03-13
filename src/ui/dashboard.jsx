import React from 'react';
import '@emotion/styled';
import './styles.css';
import DataGridDemo from './datagrid.jsx';
import Buttons from './buttons.jsx'; // Import your central stylesheet

const Dashboard = ({classes, selectedClass, classColumns, classData}) => {
    // Use optional chaining to safely access the class name

    const className = classes.find(subject => subject.id === selectedClass);

    if (className) {
        console.log(className.name); // This will log "English"
    } else {
        console.log('No item found with id:', selectedClass);
        return <div>Loading class data...</div>;
    }

    return (
        <div>
            <h2>{className.name}</h2>
            <DataGridDemo classColumns={classColumns} classData={classData}/>
            <Buttons/>
        </div>
    );
};

export default Dashboard;