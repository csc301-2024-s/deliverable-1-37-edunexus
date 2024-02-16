import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import styled from '@emotion/styled';

const useStyles = styled({
    card: {
        maxWidth: 200,
        margin: '10px', // Add some margin for spacing
    },
    avatar: {
        width: 80,
        height: 80,
        marginBottom: 10  // Space under the avatar
    }
});

function UserCard() {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar
                        alt="User Name"
                        src="/profile_picture.jpg" // Replace with your image source
                        className={classes.avatar}
                    />
                }
                title="User Name"
                subheader="Job Title"
            />
        </Card>
    );
}

export default UserCard;