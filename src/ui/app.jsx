import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {useEffect} from 'react';
import {HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import Login from './login.jsx';
import Homepage from './homepage.jsx';


const App = () => {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [classesForTeacher, setClassesForTeacher] = React.useState([]);

    useEffect(() => {
        const handleClassesForTeacher = (data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                // Do something with the list of classes
                console.log(data);
                setClassesForTeacher(data);
            }
        };

        window.api.receive('classes-for-teacher', handleClassesForTeacher);

        // Clean up the event listener when the component unmounts
        return () => {
            window.api.remove('classes-for-teacher', handleClassesForTeacher);
        };
    }, []);

    const handleLogin = (teacherId) => {
        setIsLoggedIn(true);

        //TEMP - SET TEACHERID BY LOGIN ID
        teacherId = 101;

        window.api.send('get-classes-by-teacher', teacherId);
    };

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


const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App/>);