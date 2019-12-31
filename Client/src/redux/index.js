// Dependencies
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const middleware = [thunk];

// Persist config
const persistConfig = {
    key: 'primary',
    storage
};

// Create persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and export redux store
export const store = (initialState = {}) => {
    return createStore(
        persistedReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );
};
