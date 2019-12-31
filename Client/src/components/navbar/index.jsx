// Dependencies
import React, { Component } from 'react';
import Link from '../link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

// Actions
import { logoutUser } from '@redux/actions/authActions';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        Router.push('/login');
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a
                        href=""
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link"
                    >
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" href="/register">
                        Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" href="/">
                            Chat group
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#mobile-nav"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="mobile-nav"
                        >
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
