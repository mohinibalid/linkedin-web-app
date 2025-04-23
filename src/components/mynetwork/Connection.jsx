// import { Avatar } from '@material-ui/core';
import { Avatar } from '@mui/material'; 
import React from 'react';
import './Connection.css';

const Connection = ({imageUrl,username, jobPosition = ''}) => {
    return (
        <div className='connection'>
            <Avatar style={{height:55,width:55,cursor:'pointer'}} className='connection__avatar' src={imageUrl}/>
            <h1 style={{cursor:'pointer'}}>{username}</h1>
            <h2 style={{cursor:'pointer'}}>{jobPosition || 'Software Engineer'}</h2>
        </div>
    );
};

export default Connection;