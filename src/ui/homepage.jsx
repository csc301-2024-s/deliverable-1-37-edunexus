import * as React from 'react';
import { useState } from 'react';

import './styles.css';
import Dashboard from './dashboard.jsx';
import NavigationSidebar from './sidebar/sidebar.jsx';
import { Box } from '@mui/material';

const user = {
    name: 'John Doe',
    role: 'Instructor',
};

const classes = [

    { name: 'Introduction to Computers' },
    { name: 'Basic Programming' },
    { name: 'Web Design for Beginners' },
    { name: 'Fundamentals of Robotics' },
    { name: 'Digital Literacy' }

];

// TODO: @Arthur figure out what props is
// eslint-disable-next-line no-unused-vars
const Homepage = ({onLogout}) => {
    const [selectedClass, setSelectedClass] = useState(1);

    return (
        <Box className="grid-container">
            {/* Navigation Sidebar */}
            <NavigationSidebar user={user} classes={classes} onClassChange={setSelectedClass} onLogout={onLogout}/>

            {/* Main Content Area */}
            <Box component="main" sx={{ p: 3 }}>
                <Dashboard classes={classes} selectedClass={selectedClass}/>
            </Box>
        </Box>
    );
};

export default Homepage;