// Dependencies
import { combineReducers } from 'redux';

// Reducers
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import chatReducer from './chatReducer';

export default combineReducers({
    auth: authReducer,
    chat: chatReducer,
    errors: errorReducer
});
