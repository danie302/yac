// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions
import { registerUser } from '../../redux/actions/authActions';

// Utils
import { isEmpty } from '../../utils/is';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        // Check if user is already authenticated
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/room');
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // Check for errors
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        // Dispatch user register
        this.props.registerUser(newUser, href => {
            this.props.history.push(href);
        });
    }
    render() {
        let existError;
        if (!isEmpty(this.state.errors)) {
            existError = (
                <div className="alert alert-danger" role="alert">
                    {this.state.errors}
                </div>
            );
        }
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your DevConnector account
                            </p>
                            {existError}
                            <form noValidate onSubmit={this.onSubmit}>
                                <input
                                    className="form-control form-control-lg"
                                    placeholder="Username"
                                    name="username"
                                    type="username"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />
                                <input
                                    className="form-control form-control-lg"
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <input
                                    className="form-control form-control-lg"
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
