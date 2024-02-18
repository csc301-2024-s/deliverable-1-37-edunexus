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
    TextField
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // For class icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // For user icon

const NavigationSidebar = ({ user, classes }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredClasses = classes.filter(classItem =>
        classItem.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div style={{
            height: '100vh',
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
                    <Box sx={{padding: 2, textAlign: 'center'}}>
                        <img src="/logo.png" alt="Logo" style={{maxWidth: '100%'}}/>
                    </Box>
                    <Divider/>

                    {/* User Card */}
                    <Card sx={{margin: 2, bgcolor: 'inherit'}}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {user.name}
                            </Typography>
                            <Typography color="text.secondary">
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
                            <ListItem button key={index}>
                                <ListItemIcon>
                                    <SchoolIcon/>
                                </ListItemIcon>
                                <ListItemText primary={classItem.name}/>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Card>
        </div>
    );
};

export default NavigationSidebar;
