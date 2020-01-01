// Dependencies
import express from 'express';

// Utils
import { doLogin } from '@utils/auth';
import models from '../models';

const router = express.Router();

// Routes
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    let errors = {};
    models.User.findOrCreate({
        where: { username },
        defaults: { email, password }
    }).then(([user, created]) => {
        if (created) {
            return res.sendStatus(200);
        } else {
            errors.user = 'User already exist';
            return res.status(400).json(errors);
        }
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    let errors = {};
    doLogin(email, password, models)
        .then(token => {
            console.log('success');

            return res.json({
                success: true,
                token: token
            });
        })
        .catch(err => {
            errors.user = 'Invalid login';
            return res.status(400).json(errors);
        });
});

router.get('/chat', (req, res) => {
    models.Message.findAll().then(msgs => {
        res.json({
            msgs
        });
    });
});

export default router;
