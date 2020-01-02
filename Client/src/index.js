// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

// Config
import config from './config';

// Import actions
import { setCurrentUser, logoutUser } from './redux/actions/authActions';

// Components
import AppRoutes from './route';

// Import store
import store from './redux';

// Check for token
if (localStorage.Token) {
    // Decode the token
    const decoded = jwt.verify(localStorage.Token, config.api.credentials);

    // Set user and is Authenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expiration time
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

        // Redirect to login
        window.location.href = '/login';
    }
}

render(
    <Provider store={store}>
        <Router>
            <AppRoutes />
        </Router>
    </Provider>,
    document.getElementById('root')
);
