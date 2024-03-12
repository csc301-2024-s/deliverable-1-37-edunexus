import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import Login from './login.jsx';
import Homepage from './homepage.jsx';


const App = (props) => {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
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
                    element={isLoggedIn ? <Homepage onLogout={handleLogout}/> : <Navigate replace to="/login"/>}
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
root.render(<App />);