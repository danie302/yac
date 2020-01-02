// Reducer for chat

// Import Action types
import { GET_MESSAGES } from '../actions/types';

// Import util
import { isEmpty } from '../../utils/is';

// Initial State
const initialState = {
    chat: [],
    isReady: false
};

// Export reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                chat: action.payload,
                isReady: !isEmpty(action.payload)
            };

        default:
            return state;
    }
}
