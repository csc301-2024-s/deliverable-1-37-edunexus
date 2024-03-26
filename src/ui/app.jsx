import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {useEffect} from 'react';
import {HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import Login from './login.jsx';
import Homepage from './homepage.jsx';

/**
 * React application launch point for EduNexus.
 *
 * This component serves as the root of the EduNexus application. It manages the
 * authentication state and class data for the logged-in teacher. The component
 * utilizes React Router for navigation between the login and dashboard views.
 *
 * Upon successful login, it fetches and displays the classes associated with the
 * logged-in teacher. It also handles the logout process and state cleanup.
 *
 * @returns {Element} The React component representing the entire application.
 * @constructor
 */
const App = () => {
    // React state to manage login status
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    // React state to track the currently logged-in users' classes
    const [classesForTeacher, setClassesForTeacher] = React.useState([]);

    /**
     * Sets up an effect for managing event listeners for class data.
     * The effect sets an event listener for 'classes-for-teacher' events and cleans up on unmount.
     */
    useEffect(() => {
        /**
         * Handles incoming class data for the teacher.
         * @param {Object} data - Data received from the main process, containing classes or error.
         */
        const handleClassesForTeacher = (data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                // Do something with the list of classes
                console.log(data);
                setClassesForTeacher(data);
            }
        };

        const removeListener = window.api.receive('classes-for-teacher', handleClassesForTeacher);

        // Clean up the event listener when the component unmounts
        return () => {
            removeListener();
        };
    }, []);

    /**
     * Handles login logic, sets the logged-in state, and requests class data.
     * @param {number} teacherId - The ID of the teacher logging in.
     */
    const handleLogin = (teacherId) => {
        setIsLoggedIn(true);

        //TEMP - SET TEACHERID BY LOGIN ID
        teacherId = 101;

        window.api.send('get-classes-by-teacher', teacherId);
    };

    /**
     * Handles logout logic, resets the logged-in state and class data.
     */
    const handleLogout = () => {
        setIsLoggedIn(false);
        setClassesForTeacher([]);
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={<Login onLogin={handleLogin}/>}
                />
                <Route
                    path="/dashboard"
                    element={isLoggedIn ?
                        <Homepage onLogout={handleLogout} classes={classesForTeacher}/> :
                        <Navigate replace to="/login"/>}
                />
                <Route
                    path="*"
                    element={<Navigate replace to="/login"/>}
                />
            </Routes>
        </Router>
    );
};


// Render the App component to the DOM
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App/>);