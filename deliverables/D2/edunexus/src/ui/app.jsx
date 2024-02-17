import * as React from 'react';
import { createRoot } from 'react-dom/client';

import Button from '@mui/material/Button';
// import '@emotion/styled';

import './styles.css'

// TODO Initialize this properly with a root div
const root = createRoot(document.body);

root.render(
    <div>
        <Button variant="contained">Say Hi</Button>
    </div>
);