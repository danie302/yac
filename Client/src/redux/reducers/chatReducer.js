// Reducer for chat

// Import Action types
import { GET_MESSAGES } from '../actions/types';

// Initial State
const initialState = {
    chat: []
};

// Export reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                chat: action.payload
            };

        default:
            return state;
    }
}
