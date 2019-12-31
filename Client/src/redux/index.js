// Dependencies
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

export const store = (initialState = {}) => {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );
};
