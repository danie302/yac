// Dependencies
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const middleware = [thunk];

const persistConfig = {
    key: 'primary',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = (initialState = {}) => {
    return createStore(
        persistedReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );
};
