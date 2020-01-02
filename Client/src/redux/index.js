// Dependencies
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Utils
import { isChrome } from '../utils/utils';

const initialState = {};
const middleware = [thunk];

let devTools;
if (isChrome()) {
    devTools = compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    );
} else {
    devTools = compose(applyMiddleware(...middleware));
}

//const store = createStore(rootReducer, initialState, devTools);
const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
);

export default store;
