import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // TODO: Make final product use real authentication states
    const [loggedIn, setLoggedIn] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoggedIn(true);
    };

    if (loggedIn) {
        return <App />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    required
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    required
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Login />);