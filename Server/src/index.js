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

// Models
import models from './models';

// Routes
import auth from './routes';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', auth);

// Sockets connection
io.on('connection', socket => {
    console.log('User connected');
    socket.on('msg', data => {
        let { username, content, time } = data;
        username = username.toLowerCase();
        models.User.findOne({
            where: { username }
        }).then(user => {
            models.Message.create({ content, time, username });

            socket.broadcast.emit('msg', { content, time, username });
        });
    });
});

// Connecting and synchronizing with the db
const alter = true;
const force = false;

models.sequelize.sync({ alter, force }).then(() => {
    // Running server
    server.listen($serverPort().toString(), () => {
        console.log(`Server start on port: ${$serverPort()}`);
    });
});
