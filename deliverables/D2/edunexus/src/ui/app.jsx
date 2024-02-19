import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';

import './styles.css'
import Dashboard from "./dashboard.jsx";
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
    { name: 'Digital Literacy' },
    { name: 'Game Development Basics' },
    { name: 'Introduction to Networking' },
    { name: 'Computer Graphics' },
    { name: 'Mobile App Development' },
    { name: 'Cybersecurity Fundamentals' }
    // Add more classes as needed
];

const App = (props) => {
    const [selectedClass, setSelectedClass] = useState(1)

    return (
        <Box className="grid-container">
            {/* Navigation Sidebar */}
            <NavigationSidebar user={user} classes={classes} onClassChange={setSelectedClass}/>

            {/* Main Content Area */}
            <Box component="main" sx={{ p: 3 }}>
                <Dashboard classes={classes} selectedClass={selectedClass}/>
            </Box>
        </Box>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);