// src/components/CollaborativeEditor.js
import React,{ useEffect,useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket=io('http://localhost:4000'); // Connect to your backend server
// console.log(socket);
const CollaborativeEditor=(props) => {
    const { id }=useParams();
    let { room }=props;
    if (id)
        room=id;
    // console.log(room);
    const [text,setText]=useState('');

    useEffect(() => {
        // Listen for updates from the server
        socket.emit('joinRoom',room);
        socket.on('update',(data) => {
            setText(data);
        });

        // Clean up the effect
        return () => {
            socket.off('update');
        };
    },[]);

    const handleChange=(e) => {
        const newText=e.target.value;
        setText(newText);
        socket.emit('textChange',newText); // Send updates to the server
    };

    return (
        <textarea value={text} onChange={handleChange} rows="10" cols="50" />
    );
};

export default CollaborativeEditor;
