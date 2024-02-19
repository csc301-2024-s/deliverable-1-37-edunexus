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
    ButtonBase
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // For class icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // For user icon

const NavigationSidebar = ({ user, classes, onClassChange }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredClasses = classes.filter(classItem =>
        classItem.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleListItemClick = (index) => {
        console.log("Clicked item index:", index);
        // Additional logic for when an item is clicked
        onClassChange(index)
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
                bgcolor: 'grey.800',
                color: 'common.white',
                borderRadius: 2,
                boxShadow: 3,
            }}>
                <Box>
                    {/* Logo */}
                    <Box sx={{ padding: 2, textAlign: 'center'}}>
                        {/*<img src="./logo.webp" alt="Logo" style={{maxWidth: '100%'}}/>*/}
                        <h1>EduNexus</h1>
                    </Box>
                    <Divider/>

                    {/* User Card */}
                    <Card sx={{margin: 2, bgcolor: 'inherit'}}>
                        <CardContent>
                            <Typography color="#e3e3e3" variant="h6" component="div">
                                {user.name}
                            </Typography>
                            <Typography color="#e3e3e3">
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
                        sx={{margin: 2}}
                    />

                    {/* List of Classes */}
                    <List>
                        {filteredClasses.map((classItem, index) => (
                            <ButtonBase
                                key={index}
                                onClick={() => handleListItemClick(index)}
                                style={{ width: '100%', textAlign: 'left' }}
                            >
                                <ListItem>
                                    <ListItemIcon>
                                        <SchoolIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={classItem.name}/>
                                </ListItem>
                            </ButtonBase>
                        ))}
                    </List>
                </Box>
            </Card>
        </div>
    );
};

export default NavigationSidebar;
