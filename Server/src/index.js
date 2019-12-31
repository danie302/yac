// Dependencies & Conf
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import { $serverPort } from '@config';

// Configuration
const app = express();
const server = http.createServer(app);
const io = new socketIO(server);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Sockets connection
io.on('connection', socket => {
    console.log('User connected');
    socket.on('msg', data => {
        console.log(`${data.name} send msg: ${data.msg}`);
        socket.broadcast.emit('msg', `${data.name}: ${data.msg}`);
    });
});

// Running server
server.listen($serverPort().toString(), () => {
    console.log(`Server start on port: ${$serverPort()}`);
});
