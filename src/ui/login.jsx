import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; 

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
                EduNexus
                {' '}
                <SchoolIcon sx={{ color: '#222831', fontSize: '4rem' }}/>
            </Typography>
            <Container component='main' maxWidth='xs'>
                <div>
                    
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
                </div>
            </Container>
        </Box>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Login />);
