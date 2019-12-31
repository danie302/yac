// Dependencies
import express from 'express';

// Utils
import { encrypt } from '@utils/security';
import { isPasswordMatch } from '@utils/is';
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
            console.log('fail');

            errors.user = 'Invalid login';
            return res.status(400).json(errors);
        });
});

export default router;
