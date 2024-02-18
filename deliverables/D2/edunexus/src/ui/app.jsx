import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './styles.css'
import Dashboard from "./dashboard.jsx";
import Buttons from "./buttons.jsx";
import NavigationSidebar from './sidebar/sidebar.jsx';
import DataGridDemo from './datagrid.jsx';
import { Box } from '@mui/material';

const user = {
    name: 'John Doe',
    role: 'Instructor',
};

const classes = [
    { name: 'Computer Science 101' },
    { name: 'Advanced Algorithms' },
    // Add more classes as needed
];

const App = (props) => {
    return (
        <Box className="grid-container">
            {/* Navigation Sidebar */}
            <NavigationSidebar user={user} classes={classes} />

            {/* Main Content Area */}
            <Box component="main" sx={{ p: 3 }}>
                <h1 className={'temp'}>EduNexus</h1>
                <Dashboard />
                <DataGridDemo />
                <Buttons />
            </Box>
        </Box>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);