// Dependencies
import React, { Component } from 'react';
import Link from '@components/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

// Assets
import './index.scss';

class Home extends Component {
    componentDidMount() {
        // Check if the user is already authenticated
        if (this.props.auth.isAuthenticated) {
            Router.push('/room');
        }
    }
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-4 mb-4">Chat group</h1>
                                <p className="lead">
                                    Come to chat with a random group of people.
                                </p>
                                <hr />
                                <Link
                                    href="/register"
                                    className="btn btn-lg btn-info mr-2"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    href="/login"
                                    className="btn btn-lg btn-light"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home);
