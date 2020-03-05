import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';


import * as actions from '../../store/actions/auth';
import classes from './Login.module.css';
import Card from '../Card';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.onAuthenticate(username, password);
        }
    };

    displayErrorMessage = () => {
        if (this.props.error && this.state.submitted) {
            return (
                <div className="alert alert-danger alert-dismissible fade show"
                     role="alert">{this.props.error.data.detail}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            );
        }
    };

    render() {
        return (
            <LoadingOverlay
                active={this.props.loading}
                spinner
                text='Logging in...'
            >
                <Card>
                    <article className={`card-body mx-auto ${classes['card-width']}`}>
                        <h4 className="card-title mt-3 text-center">LOGIN</h4>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user" /> </span>
                            </div>
                            <input className="form-control" type="text" name="username" placeholder="Username"
                                   onChange={this.handleChange} />
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                            </div>
                            <input className="form-control" type="password" name="password" placeholder="Password"
                                   onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"
                                    onClick={this.handleSubmit}>Login
                            </button>
                        </div>
                        {this.displayErrorMessage()}
                        <div className="mt-4">
                            <div className="d-flex justify-content-center">
                                Don't have an account? <Link to="/register" className="ml-2">Sign Up</Link>
                            </div>
                            <div className="d-flex justify-content-center">
                                Forgot password? <Link to="/password-reset" className="ml-2">Reset password</Link>
                            </div>
                        </div>
                    </article>
                </Card>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        isAuthenticated: state.auth.authenticated,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (username, password) => dispatch(actions.authenticate(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);