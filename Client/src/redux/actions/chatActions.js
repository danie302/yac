// Dependencies
import axios from 'axios';

// Config
import config from '@config';

// Import Action types
import { GET_MESSAGES, GET_ERRORS } from './types';

// Register User
export const getChat = () => dispatch => {
    axios
        .get(config.api.uri + '/chat')
        .then(res => {
            dispatch({
                type: GET_MESSAGES,
                payload: res.data.msgs
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};
