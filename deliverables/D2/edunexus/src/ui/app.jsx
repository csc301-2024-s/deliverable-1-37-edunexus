import * as React from 'react';
import { createRoot } from 'react-dom/client';

import Button from '@mui/material/Button';
// import '@emotion/styled';

import './styles.css'

// TODO Initialize this properly with a root div
const root = createRoot(document.body);

root.render(
    <div>
        <Button variant="contained"
                onClick={() => {
                    console.log("Button was clicked");
                    window.electronAPI.pingPong('funky number')
                }}>Say Hi</Button>
    </div>
);