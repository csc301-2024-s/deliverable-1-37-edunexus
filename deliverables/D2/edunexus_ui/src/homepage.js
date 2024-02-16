import * as React from 'react';

import Box from '@mui/material/Box';
import Nav from "./Nav";
import {useState} from "react";

function Homepage() {
    const [openNav, setOpenNav] = useState(false);

    return (
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
    );
}
export default Homepage;
