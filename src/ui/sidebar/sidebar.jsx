import React, { useState } from 'react';

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
    Paper
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // For class icons
// import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // For user icon

const NavigationSidebar = ({ user, classes, onClassChange }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredClasses = classes.filter(classItem =>
        classItem.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleListItemClick = (index) => {
        console.log('Clicked item index:', index);
        // Additional logic for when an item is clicked
        onClassChange(index);
    };


    return (
        <div style={{
            height: '97vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Card sx={{
                flexGrow: 1, // Allows the card to fill the space
                width: '100%',
                bgcolor: '#31363F',
                color: 'common.white',
                borderRadius: 2,
                boxShadow: 3,
            }}>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item>
                        <Box>
                            {/* Logo */}
                            <Box sx={{ padding: 2, textAlign: 'center'}}>
                                {/*<img src="./logo.webp" alt="Logo" style={{maxWidth: '100%'}}/>*/}
                                <h1>EduNexus</h1>

                            </Box>
                            <Divider/>

                            {/* User Card */}
                            <Card sx={{
                                margin: 2,
                                bgcolor: 'inherit',
                                border: '2px solid #EEEEEE',
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.4)',
                            }}>
                                <CardContent>
                                    <Typography color="#EEEEEE" variant="h6" component="div">
                                        {user.name}
                                    </Typography>
                                    <Typography color="#EEEEEE">
                                        {user.role}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Divider/>

                            {/* Search Textbox */}
                            <TextField
                                label="Search for a class"
                                variant="outlined"
                                value={searchText}
                                onChange={handleSearch}
                                sx={{margin: 2,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#878787',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#EEEEEE'
                                        },
                                    },}}
                                InputLabelProps={{ style: { color: '#EEEEEE' } }}
                                inputProps={{ style: { color: '#EEEEEE' } }}
                            />

                            {/* List of Classes */}
                            <Paper style={{ maxHeight: 350, overflow: 'auto' }} sx={{ bgcolor:'#31363F', '&::-webkit-scrollbar': { display: 'none' } }}>
                                <List>
                                    {filteredClasses.map((classItem, index) => (
                                        <ButtonBase
                                            key={index}
                                            onClick={() => handleListItemClick(index)}
                                            style={{ width: '100%', textAlign: 'left' }}
                                        >
                                            <ListItem>
                                                <ListItemIcon>
                                                    <SchoolIcon sx={{ color: '#EEEEEE' }}/>
                                                </ListItemIcon>
                                                <ListItemText primary={classItem.name} sx={{ color: '#EEEEEE' }} />
                                            </ListItem>
                                        </ButtonBase>
                                    ))}
                                </List>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" style={{ backgroundColor: '#76ABAE', color: '#EEEEEE' }}>
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default NavigationSidebar;
