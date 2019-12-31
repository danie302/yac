// Reducer for authenticate users

// Import Action types
import { SET_CURRENT_USER } from '../actions/types';

// Import util
import { isEmpty } from '@utils/is';

// Initial State
const initialState = {
    isAuthenticated: false,
    user: {}
};

// Export reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };

        default:
            return state;
    }
}
