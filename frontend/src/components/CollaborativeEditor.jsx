// src/components/CollaborativeEditor.js
import React,{ useEffect,useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';


let url;
if (import.meta.env.NODE_ENV=="development") {
    url=import.meta.env.VITE_LOCALHOST_URL;
} else {
    url=import.meta.env.VITE_DEPLOYED_URL;
}

console.log(url)
const socket=io(url);
const Container=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1e1e1e;
  color: #d4d4d4;
`;

const TextArea=styled.textarea`
  width: 90%;
  height: 80vh;
  background-color: #1e1e1e;
  color: #d4d4d4;
  border: 1px solid #555;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
  resize: none;
  outline: none;
`;
const CollaborativeEditor=(props) => {
    const { id }=useParams();
    let { room }=props;
    if (id)
        room=id;
    const [text,setText]=useState('');
    useEffect(() => {
        socket.emit('joinRoom',room);
        socket.on('update',(data) => {
            setText(data);
        });

        return () => {
            socket.off('update');
        };
    },[]);

    const handleChange=(e) => {
        const newText=e.target.value;
        setText(newText);
        socket.emit('textChange',newText);
    };

    return (
        <Container>
            <TextArea
                value={text}
                onChange={handleChange}
                placeholder="Enter your code here..."
            />
        </Container>
    );
};

export default CollaborativeEditor;
