import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // For class icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // For user icon

const NavigationSidebar = ({ user, classes }) => {
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

                    {/* List of Classes */}
                    <List>
                        {classes.map((classItem, index) => (
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
