// Reducer to get errors

// Import Action types
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

// Initial State
const initialState = {};

// Export Reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;

        case CLEAR_ERRORS:
            return {};

        default:
            return state;
    }
}
