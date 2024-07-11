import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app=express();
const server=http.createServer(app);

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST'],
    allowedHeaders: ['Content-Type']
}));

const io=new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET","POST"]
    }
});

let texts={};  // Store text for each room

// Handle connections and text updates within rooms
io.on('connection',(socket) => {
    console.log('New client connected');

    // Join a room
    socket.on('joinRoom',(room) => {
        socket.join(room);
        console.log(`Client joined room ${room}`);

        // Send the current text of the room to the new client
        socket.emit('update',texts[room]||'');

        // Listen for text changes within the room
        socket.on('textChange',(newText) => {
            texts[room]=newText;
            io.to(room).emit('update',texts[room]); // Broadcast changes to all clients in the room
        });
    });

    socket.on('disconnect',() => {
        console.log('Client disconnected');
    });
});

server.listen(4000,() => {
    console.log('Server is running on port 4000');
});
