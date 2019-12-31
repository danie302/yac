// Dependencies
import axios from 'axios';
//import jwt_decode from 'jwt-decode';

// Import Action types
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            // Save to Local Storage
            const { token } = res.data;

            // Store token in LocalStorage
            localStorage.setItem('Token', token);

            // Decode token to get user data
            //const decoded = jwt_decode(token);
            const decoded = token;

            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
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
