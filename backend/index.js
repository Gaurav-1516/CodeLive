import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "*",
    },
});

io.on("connection",(socket)=>{
    console.log("Client Connected", socket.id);
});

const port = process.env.PORT || 5000;

server.listen(port,()=>{
    console.log("Server Running");
});