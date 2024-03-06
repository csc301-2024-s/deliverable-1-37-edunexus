import React from 'react';
import Button from '@mui/material/Button';
import '@emotion/styled';
import './styles.css'; // Import your central stylesheet

function SayHiButton() {
    return (
        <Button variant="contained"
            onClick={() => {
                alert('Clicked');
                console.log('Button was clicked');
                window.electronAPI.ping();
            }}>Say Hi</Button>
    );
}

export default SayHiButton;
