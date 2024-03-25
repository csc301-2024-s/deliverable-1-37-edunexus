import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';

/**
 * Login component for handling user authentication.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onLogin - Callback function after successful login
 * @returns {React.ReactElement} The rendered login form component
 */
export function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /**
     * Handles changes to the username input field.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event
     */
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    /**
     * Handles changes to the password input field.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event
     */
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
  
    /**
     * Handles the form submission for user login.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form event
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Callback function to process data upon login
        const data = { username, password };
        window.api.send('login-authentication', data);

        // If login was successful, call onLogin and navigate to dashboard
        window.api.receive('login-success', () => {
            onLogin();
            navigate('/dashboard');
        });

        window.api.receive('login-failed', () => {
            // TODO: Alert user that login failed, potentially with a pop-up
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Typography variant='h2' fontWeight='bold' mb={2} color='#222831'>
                EduNexus <SchoolIcon sx={{ color: '#222831', fontSize: '4rem' }}/>
            </Typography>
            <Container component='main' maxWidth='xs'>
                <Typography component='h1' variant='h5' color='#222831'>
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        autoComplete='username'
                        autoFocus
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                        style={{ backgroundColor: '#76ABAE', color: '#FFFFFF' }}
                    >
                        Sign In
                    </Button>
                </form>
            </Container>
        </Box>
    );
}

export default Login;
