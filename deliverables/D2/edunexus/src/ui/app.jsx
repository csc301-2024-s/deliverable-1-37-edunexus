import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Link, Route, Routes } from "react-router-dom"

// import { sayHiButton } from './hi_button'

import Button from '@mui/material/Button';
// import '@emotion/styled';

import './styles.css'
import Dashboard from "./dashboard.jsx";
// import Hi_button from "./hi_button";




const Stand = ()=>{
    return(
        <Stand/>
    )
}

const Sit = ()=>{
    return(
        <Sit/>
    )
}

const Dash = ()=>{
    return(
        <Dashboard/>
    )
}

const App = (props)=> {

    return (
        // <HashRouter>
        //     <div className="App">
        //         <div className="menu">
        //             <Link to="/dashboard"><h2>Home</h2></Link>
        //             <Link to="/one"><h2>Stand</h2></Link>
        //             <Link to="/two"><h2>Sit</h2></Link>
        //         </div>
        //         <Routes>
        //             <Route exact path="/" component={Dash}/>
        //             <Route exact path="/one" component={Stand}/>
        //             <Route exact path="/two" component={Sit}/>
        //         </Routes>
        //     </div>
        // </HashRouter>

        <Dashboard></Dashboard>
    );
}

// TODO Initialize this properly with a root div
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);