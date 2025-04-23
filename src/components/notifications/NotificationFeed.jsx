import React, { useState } from 'react';
import './NotificationFeed.css';
import { Avatar, IconButton, Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const NotificationFeed = () => {
    const [open,setOpen] = useState(false);
    
    return (
        <div className='notificationFeed'>
            <div className='notificationFeed__left'>
            <Avatar style={{cursor:'pointer'}}/>
            </div>
            <div className='notificationFeed__middle'>
                <p style={{cursor:'pointer'}}>Congratulate Mohini Balid for starting a new position as React Js Developer at Persistent Systems...</p>
                <Button size='small' variant='outlined'>View event</Button>
            </div>
            <div className='notificationFeed__right'>
                <h1>3h</h1>
                <IconButton onClick={()=> setOpen(true)}>
                <MoreHorizIcon/>
                </IconButton>
                
            </div>
        </div>
    );
};

export default NotificationFeed;