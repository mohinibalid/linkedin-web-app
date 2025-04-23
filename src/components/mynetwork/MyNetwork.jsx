import React, { useEffect, useState } from 'react';
import './MyNetwork.css';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ContactsIcon from '@mui/icons-material/Contacts';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import PagesIcon from '@mui/icons-material/Pages';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import MyNetworkSidebarOption from './MyNetworkSidebarOption';
import { db } from '../../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import LinkedinAvatar from "../../assets/linkedin-avatar.svg";
import { useSelector } from "react-redux";
import Connection from './Connection';
import { Snackbar, Alert } from '@mui/material';

const MyNetwork = () => {
    const [connections, setConnections] = useState([]);
    const [users, setUsers] = useState([]);
    const { user:cuser } = useSelector((state) => state.auth);
    const [showConnections, setShowConnections] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [snackbarMessage, setSnackbarMessage] = useState(''); 

    // Fetch connections from Firestore
    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const currentUserId = cuser.uid; 
                const querySnapshot = await getDocs(collection(db, 'connections'));
                const connectionsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log('Fetched Connections:', connectionsData); 
                const filteredConnections = connectionsData.filter(
                    connection => Array.isArray(connection.users) && connection.users.includes(currentUserId)
                );
                setConnections(filteredConnections);
            } catch (error) {
                console.error('Error fetching connections:', error);
            }
        };

        fetchConnections();
    }, []);

    // Fetch users from Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const usersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Handle Connect Button Click
    // const handleConnect = async (user) => {
    //     try {
    //         await addDoc(collection(db, 'connections'), {
    //             photoURL: user.photoURL,
    //             displayName: user.displayName,
    //             email: user.email,
    //             uid: user.uid,
    //         });
    //         alert(`You are now connected with ${user.displayName}!`);
    //     } catch (error) {
    //         console.error('Error adding connection:', error);
    //         alert('Failed to connect. Please try again.');
    //     }
    // };
    const handleConnect = async (user) => {
        try {
            const currentUserId = cuser.uid;
            await addDoc(collection(db, 'connections'), {
                users: [currentUserId, user.uid], 
                createdAt: new Date(), 
            });
            setSnackbarMessage(`You are now connected with ${user.displayName}!`); 
            setSnackbarOpen(true); 
            const querySnapshot = await getDocs(collection(db, 'connections'));
            const connectionsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('Fetched Connections:', connectionsData);
            const filteredConnections = connectionsData.filter(
                connection => Array.isArray(connection.users) && connection.users.includes(currentUserId)
            );
            setConnections(filteredConnections);
        } catch (error) {
            console.error('Error adding connection:', error);
            setSnackbarMessage('Failed to connect. Please try again.');
            setSnackbarOpen(true); 
        }
    };

    const showConnectionsHandler = () => {
        setShowConnections(!showConnections);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false); 
    };
    let connecs = true;
    return (
        <div className='mynetwork'>
            <div className='myNetwork__sidebar'>
                <h1 style={{color:'gray',fontSize:13,fontWeight:200,padding:15,cursor:'pointer'}}>Manage My Network</h1>
                <MyNetworkSidebarOption
                    Icon={SupervisorAccountIcon}
                    title='Connection'
                    onClick={showConnectionsHandler} />
                <MyNetworkSidebarOption Icon={ContactsIcon} title='Contacts'/>
                <MyNetworkSidebarOption Icon={NaturePeopleIcon} title='People|Follow'/>
                <MyNetworkSidebarOption Icon={GroupIcon} title='Group'/>
                <MyNetworkSidebarOption Icon={EventIcon} title='Events'/>
                <MyNetworkSidebarOption Icon={PagesIcon} title='Pages'/>
                <MyNetworkSidebarOption Icon={CardMembershipIcon} title='Newsletters'/>
            </div>
            <div className='myNetwork__feed'>
                <div className='myNetworkFeed__top'>
                    <h1 style={{color:'gray',fontSize:13,fontWeight:200,padding:15,cursor:'pointer',alignItems:'center'}}>No Pending Invitation</h1>
                    <h1 style={{color:'gray',fontSize:13,fontWeight:200,padding:15,cursor:'pointer',marginLeft:'auto',alignItems:'center'}}>Manage</h1>
                </div>
                <div className='myNetworkFeed__bottom'>
                    {showConnections && (<>
                        <div className='myNetworkFeedOption__top'>
                            <h1 style={{color:'gray',fontSize:13,fontWeight:300,padding:15,cursor:'pointer'}}>My Connections</h1>
                        </div>
                        <div className="myNetworkFeedOption__bottom">
                            {
                            
                            users
                                .filter((user) => 
                                    connections.some((connection) => connection.users.includes(user.uid))
                                )
                                .map((user) => { 
                                    if (user.uid === cuser.uid || !user.uid) {
                                        return null;
                                    }
                                    connecs = false;
                                    return (
                                        <Connection
                                            key={user.uid}
                                            imageUrl={LinkedinAvatar}
                                            username={user.displayName}
                                            jobPosition={user.jobPosition}
                                        />
                                    )}
                            )}
                            {connecs && <p>No connections found</p>}
                        </div></>
                    )}
                    {!showConnections && (<>
                        <div className='myNetworkFeedOption__top'>
                            <h1 style={{color:'gray',fontSize:13,fontWeight:300,padding:15,cursor:'pointer'}}>Suggested Connections</h1>
                        </div>
                        <div className="">
                        {users
                            .filter((user) => 
                                !connections.some((connection) => connection.users.includes(user.uid))
                            )
                            .map((user) => { 
                                if (user.uid === cuser.uid || !user.uid) {
                                    return null; // Skip rendering if the user is the current user
                                }
                                return (
                                <div key={user.uid} className="suggestedUser">
                                    <img src={LinkedinAvatar} alt={user.displayName} className="suggestedUser__image" />
                                    <div className="suggestedUser__info">
                                        <h3 className='font-semibold mb-2'>{user.displayName}</h3>
                                        <p className='mb-2' style={{ fontSize: '12px', color: 'gray' }}>
                                            {user.jobPosition || 'Software Engineer'}
                                        </p>
                                        <button
                                            onClick={() => handleConnect(user)}
                                            className="connectButton"
                                        >
                                            Connect
                                        </button>
                                    </div>
                                </div>
                            )}
                            )}
                        </div></>  
                    )}
                </div>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000} // Snackbar will auto-close after 3 seconds
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default MyNetwork;