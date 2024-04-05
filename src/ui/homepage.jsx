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

/**
 * Renames the `studentNumber` property to `id` for each student in an array.
 *
 * @param {Object[]} students - The array of student objects to transform.
 * @returns {Object[]} The transformed array of student objects with `studentNumber` renamed to `id`.
 */
function renameStudentNumberToId(students) {
    return students.map(student => {
        const { studentNumber, ...rest } = student;
        return { id: studentNumber, ...rest };
    });
}

/**
 * Represents the homepage component of the application.
 *
 * The Homepage component is the main container for the application's user interface.
 * It includes a navigation sidebar, a dashboard displaying student data, and
 * handles the dynamic fetching and displaying of this data based on the selected class.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onLogout - The function to call when logging out.
 * @param {Object[]} props.classes - The list of classes to display in the sidebar for selection.
 * @param {boolean} userIsAdmin - Whether the currently logged-in user is an admin
 * @returns {React.ReactElement} The Homepage component.
 */
const Homepage = ({ onLogout, classes, userIsAdmin, teacherName}) => {
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
            removeListener();
        };
    }, [selectedClass]);

    return (
        <Box className="grid-container">
            {/* Navigation Sidebar */}
            <NavigationSidebar user={user} admin={userIsAdmin} classes={classes} onClassChange={setSelectedClass} onLogout={onLogout} userIsAdmin={userIsAdmin} teacherName={teacherName}/>

            {/* Main Content Area */}
            <Box component="main" sx={{ p: 3 }}>
                <Dashboard classes={classes} selectedClass={selectedClass} classColumns={columns} classData={studentData}/>
            </Box>
        </Box>
    );
};

export default Homepage;