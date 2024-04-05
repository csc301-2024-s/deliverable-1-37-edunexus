import React from 'react';
import '@emotion/styled';
import './styles.css';
import DataGridDemo from './datagrid.jsx';
import Buttons from './buttons.jsx';


/**
 * Dashboard component that displays information about a selected class.
 * It shows the class name and renders a data grid and buttons related to the class.
 *
 * @param {Object} props The properties passed to the Dashboard component
 * @param {Array} props.classes An array of class objects to be displayed
 * @param {number} props.selectedClass The ID of the currently selected class
 * @param {Array} props.classColumns The columns configuration for the data grid
 * @param {Array} props.classData The data to be displayed in the data grid
 * @returns {React.JSX.Element} The Dashboard component
 */
const Dashboard = ({classes, selectedClass, classColumns, classData}) => {

    // Use optional chaining to safely access the class name
    const className = classes.find(subject => subject.id === selectedClass);

    // Keep track of the selected rows
    const [selectedRow, setSelectedRow] = React.useState([]);

    if (className) {
        console.log(className.name);
    } else {
        return <div>Loading class data...</div>;
    }

    return (
        <div>
            <h2>{className.name}</h2>
            <DataGridDemo classColumns={classColumns} className={className} classData={classData} setSelectedRow={setSelectedRow} selectedRow={selectedRow}/>
            <Buttons 
                selectedRow={selectedRow} 
                classData={classData}
                className={className.name}
            />

        </div>
    );
};

export default Dashboard;