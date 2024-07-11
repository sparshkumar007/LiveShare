import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from "dotenv"

dotenv.config();

const app=express();
const server=http.createServer(app);

let url;
if (process.env.NODE_ENV=="development") {
    url=process.env.LOCALHOST_URL;
} else {
    url=process.env.DEPLOYED_URL;
}
// Use CORS middleware
console.log(url);
app.use(cors({
    origin: url,
    methods: ['GET','POST'],
    allowedHeaders: ['Content-Type']
}));

const io=new Server(server,{
    cors: {
        origin: url,
        methods: ["GET","POST"]
    }
});

console.log('server created')

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
