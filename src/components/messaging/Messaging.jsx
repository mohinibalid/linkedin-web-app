import React, { useEffect, useState } from 'react';
import './Messaging.css';
import { db } from '../../firebase'; // Import Firebase configuration
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useSelector } from "react-redux";
import { blue } from '@mui/material/colors';

const Messaging = () => {
    const [connections, setConnections] = useState([]); // List of connections
    const [selectedConnection, setSelectedConnection] = useState(null); // Selected connection
    const [messages, setMessages] = useState([]); // Messages for the selected connection
    const [newMessage, setNewMessage] = useState('');
    const { user: currentUser } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);
    
    // Fetch connections
    useEffect(() => {

        const fetchConnections = async () => {
            try {
                const currentUserId = currentUser.uid; 
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
    // Fetch messages for the selected connection
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedConnection) return;

            try {
                const q = query(
                    collection(db, 'messages'),
                    where('participants', 'array-contains', currentUser.uid),
                    where('participants', 'array-contains', selectedConnection.uid),
                    orderBy('timestamp', 'asc')
                );
                const querySnapshot = await getDocs(q);

                const fetchedMessages = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setMessages(fetchedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [selectedConnection, currentUser.uid]);

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

    // Handle sending a message
    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedConnection) return;

        const message = {
            text: newMessage,
            sender: currentUser.uid,
            receiver: selectedConnection.uid,
            timestamp: new Date().toISOString(),
        };

        try {
            // Save message to Firebase
            await addDoc(collection(db, 'messages'), {
                ...message,
                participants: [currentUser.uid, selectedConnection.uid],
            });

            // Update local state
            setMessages([...messages, { ...message, id: Date.now(), participants: [currentUser.uid, selectedConnection.uid] }]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
            const querySnapshot = await getDocs(q);
    
            const fetchedMessages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
    
            setMessages(fetchedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="messaging">
            {/* Left Sidebar: Connections List */}
            <div className="messaging__left">
                <h2 className='heading-conn'>Connections</h2>
                <ul className="connectionsList">
                {users
                    .filter((user) => 
                        connections.some((connection) => connection.users.includes(user.uid))
                    )
                    .map((user) => { 
                        if (user.uid === currentUser.uid || !user.uid) {
                            return null;
                        }
                        return (
                            <li
                                key={user.id}
                                className={`connectionItem ${
                                    selectedConnection?.uid === user.uid ? 'active' : ''
                                }`}
                                onClick={() => setSelectedConnection(user)}
                            >
                                {user.displayName}
                            </li>
                        )}
                )}
                </ul>
            </div>

            {/* Right Sidebar: Conversation */}
            <div className="messaging__right">
                {selectedConnection ? (
                    <>
                        <h2 className='heading-conn'>Conversation with {selectedConnection.displayName}</h2>
                        <div className="messageList">
                            {messages.map((msg) => {
                                // if (msg.receiver !== selectedConnection.uid) return;
                                if (!msg?.participants || msg.participants.length === 0) return null;
                                if (!(msg.participants.includes(currentUser.uid) && msg.participants.includes(selectedConnection.uid))) {
                                    return null;
                                }
                                return (
                                <div key={msg.id} className={`messageItem${msg.sender === currentUser.uid ? '-you' : ''}`}>
                                    <p>
                                        <strong>{msg.sender === currentUser.uid ? 'You' : selectedConnection.displayName}:</strong>{' '}
                                        {msg.text}
                                    </p>
                                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                                        {new Date(msg.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                )
                             })}
                        </div>
                        <div className="messageInput">
                            <input
                                type="text"
                                placeholder="Write a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Select a connection to start a conversation.</p>
                )}
            </div>
        </div>
    );
};

export default Messaging;