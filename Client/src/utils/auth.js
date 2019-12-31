// Dependencies
import jwt from 'jsonwebtoken';

// Utils
import { encrypt, setBase64 } from './security';
import { isPasswordMatch } from './is';

// Configuration
import { $security } from '@config';

export const createToken = async user => {
    const { id, username, password, email } = user;
    const token = setBase64(`${encrypt($security().secretKey)}${password}`);
    const userData = {
        id,
        username,
        email,
        token
    };

    const newToken = jwt.sign(
        { data: setBase64(userData) },
        $security().secretKey,
        { expiresIn: $security().expiresIn }
    );

    return Promise.all([newToken]);
};

export const doLogin = async (email, password, models) => {
    const user = await models.User.findOne({
        where: { email },
        raw: true
    });

    if (!user) {
        const error = 'User don`t exist';
        throw error;
    }

    const passwordMatch = isPasswordMatch(encrypt(password), user.password);

    if (!passwordMatch) {
        const error = 'Password Incorrect';
        throw error;
    }

    const [token] = await createToken(user);

    return {
        token
    };
};
