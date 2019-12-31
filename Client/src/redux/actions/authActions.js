// Dependencies
import axios from 'axios';
import jwt from 'jsonwebtoken';

// Config
import config from '@config';

// Import Action types
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, href) => dispatch => {
    axios
        .post(config.api.uri + '/register', userData)
        .then(res => href('/room'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login User
export const loginUser = (userData, href) => dispatch => {
    axios
        .post(config.api.uri + '/login', userData)
        .then(res => {
            // Save to Local Storage
            const { token } = res.data;

            // Store token in LocalStorage
            localStorage.setItem('Token', token.token);

            // Decode token to get user data
            const decoded = jwt.verify(token.token, config.api.credentials);

            // Set current user
            dispatch(setCurrentUser(decoded));
            href('/room');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Logout user
export const logoutUser = () => dispatch => {
    // Remove the token from localStorage
    localStorage.removeItem('Token');

    // Set current user to empty
    dispatch(setCurrentUser({}));
};
