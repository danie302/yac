// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from '../pages/app';
import Home from '../pages';
import Login from '../pages/login';
import Register from '../pages/register';
import Room from '../pages/room';

const AppRoutes = () => (
    <App>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/room" exact component={Room} />
        </Switch>
    </App>
);

export default AppRoutes;
