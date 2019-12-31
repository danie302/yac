// Dependencies
import express from 'express';
import next from 'next';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

// Configuration
import config from '@config';

// Setting up Next App
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Running Next App
nextApp.prepare().then(() => {
    const app = express();

    // Public static
    app.use(express.static(path.join(__dirname, '../public')));

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors({ credentials: true, origin: true }));

    // Manage nextJs routes
    app.all('*', (req, res) => {
        return handle(req, res);
    });

    // Listening port 3000
    app.listen(config.serverPort);
});
