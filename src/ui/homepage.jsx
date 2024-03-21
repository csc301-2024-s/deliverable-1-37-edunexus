import * as React from 'react';
import { useState } from 'react';

import './styles.css';
import Dashboard from './dashboard.jsx';
import NavigationSidebar from './sidebar/sidebar.jsx';
import { Box } from '@mui/material';
import StudentInfo from './studentInfo.jsx';

const user = {
    name: 'John Doe',
    role: 'Instructor',
};


function renameStudentNumberToId(students) {
    return students.map(student => {
        const { studentNumber, ...rest } = student;
        return { id: studentNumber, ...rest };
    });
}

const Homepage = ({ onLogout, classes }) => {
    const [selectedClass, setSelectedClass] = useState(1);


    const [studentData, setStudentData] = React.useState([]);
    const [columns, setColumns] = React.useState([]);

    // Static columns for ID and Student Name

    React.useEffect(() => {
        // Function to handle the data received from the main process

        const staticColumns = [
            {field: 'id', headerName: 'Student ID', width: 90, editable: false,
                align: 'center',
                renderCell: (params) => (
                    <StudentInfo studentNumber={params.value}>{params.value}</StudentInfo>
                )},
            {field: 'studentName', headerName: 'Student Name', width: 150, editable: true}
        ];
        const handleDataResponse = (data) => {
            if (!data) {
                console.error('No data received');
            } else if (data.error) {
                console.error(data.error);
            } else {
                // Update state with fetched data
                console.log(data.columns);
                console.log(data.items);
                const dataRenamed = renameStudentNumberToId(data.items);

                const dynamicColumns = data.columns.map(col => ({
                    field: col.name,
                    headerName: col.name,
                    width: 100,
                    type: 'number',
                    editable: true
                }));

                setStudentData(dataRenamed);
                setColumns(staticColumns.concat(dynamicColumns));
            }
        };

        window.api.send('get-datagrid-by-class', selectedClass);

        const removeListener = window.api.receive('datagrid-for-class', handleDataResponse);

        return () => {
            // TODO not removing the listener will cause a memory leak but there is currently an error in this
            removeListener();
        };
    }, [selectedClass]);

    return (
        <Box className="grid-container">
            {/* Navigation Sidebar */}
            <NavigationSidebar user={user} classes={classes} onClassChange={setSelectedClass} onLogout={onLogout}/>

            {/* Main Content Area */}
            <Box component="main" sx={{ p: 3 }}>
                <Dashboard classes={classes} selectedClass={selectedClass} classColumns={columns} classData={studentData}/>
            </Box>
        </Box>
    );
};

export default Homepage;