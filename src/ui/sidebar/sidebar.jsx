import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    TextField,
    ButtonBase,
    Button,
    Grid,
    Paper,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // For class icons

/**
 * Navigation sidebar component.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.user - The user object containing the user's information.
 * @param {Array} props.classes - Array of class objects that the user has access to.
 * @param {Function} props.onClassChange - Function to be called when a class is selected.
 * @param {Function} props.onLogout - Function to be called when the logout button is clicked.
 */
const NavigationSidebar = ({user, classes, onClassChange, onLogout}) => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');

    /**
     * Handles the search text field change event.
     *
     * @param {Object} event - The event object.
     */
    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredClasses = classes.filter((classItem) =>
        classItem.name.toLowerCase().includes(searchText.toLowerCase())
    );

    /**
     * Handles the list item click event.
     *
     * @param {number} index - The index of the clicked item.
     */
    const handleListItemClick = (index) => {
        console.log('Clicked item index:', index);
        onClassChange(index);
    };

    /**
     * Handles the logout button click event.
     */
    const handleLogout = () => {
        onLogout(); // Call the logout function passed from App
        navigate('/login'); // Redirect to login page
    };

    /**
     * Renders the class list.
     *
     * @returns {React.ReactNode} The class list component.
     */
    const renderClassList = () => {
        if (!classes.length) {
            return <Typography sx={{ color: '#EEEEEE', margin: 2 }}>Loading classes...</Typography>;
        }
        return (
            <Paper
                style={{ maxHeight: 350, overflow: 'auto' }}
                sx={{ bgcolor: '#31363F', '&::-webkit-scrollbar': { display: 'none' } }}
            >
                <List>
                    {filteredClasses.map((classItem) => (
                        <ButtonBase
                            key={classItem.id}
                            onClick={() => handleListItemClick(classItem.id)}
                            style={{ width: '100%', textAlign: 'left' }}
                        >
                            <ListItem>
                                <ListItemIcon>
                                    <SchoolIcon sx={{ color: '#EEEEEE' }} />
                                </ListItemIcon>
                                <ListItemText primary={classItem.name} sx={{ color: '#EEEEEE' }} />
                            </ListItem>
                        </ButtonBase>
                    ))}
                </List>
            </Paper>
        );
    };

    return (
        <div
            style={{
                height: '97%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Card
                sx={{
                    flexGrow: 1, // Allows the card to fill the space
                    width: '100%',
                    bgcolor: '#31363F',
                    color: 'common.white',
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item>
                        <Box>
                            {/* Logo */}
                            <Box sx={{ padding: 2, textAlign: 'center' }}>
                                {/*<img src="./logo.webp" alt="Logo" style={{maxWidth: '100%'}}/>*/}
                                <h1>EduNexus</h1>
                            </Box>
                            <Divider />

                            {/* User Card */}
                            <Card
                                sx={{
                                    margin: 2,
                                    bgcolor: 'inherit',
                                    border: '2px solid #EEEEEE',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.4)',
                                }}
                            >
                                <CardContent>
                                    <Typography color="#EEEEEE" variant="h6" component="div">
                                        {user.name}
                                    </Typography>
                                    <Typography color="#EEEEEE">{user.role}</Typography>
                                </CardContent>
                            </Card>
                            <Divider />

                            {/* Search Textbox */}
                            <TextField
                                label="Search for a class"
                                variant="outlined"
                                value={searchText}
                                onChange={handleSearch}
                                sx={{
                                    margin: 2,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#878787',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#EEEEEE',
                                        },
                                    },
                                }}
                                InputLabelProps={{ style: { color: '#EEEEEE' } }}
                                inputProps={{ style: { color: '#EEEEEE' } }}
                            />
                            {renderClassList()}
                        </Box>
                    </Grid>
                    <div className="buttons-container" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#76ABAE', color: '#EEEEEE' }}
                            onClick={() => handleLogout()}
                            id='logoutBtn'
                        >
                            Logout
                        </Button>
                        {/* TODO: placeholder for admin state */}
                        {/* {user.role === 'admin' && ( */}
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#76ABAE', color: '#EEEEEE'}}
                            onClick={() => navigate('/admin')}
                        >
                            Admin
                        </Button>
                        {/* )} */}
                    </div>
                </Grid>
            </Card>
        </div>
    );
};

export default NavigationSidebar;
