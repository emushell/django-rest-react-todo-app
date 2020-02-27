import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import classes from './Login.module.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.onAuthenticate(username, password);
        }
    };

    render() {
        return (
            <div className="card bg-light mt-1">
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
                    <div className="mt-4">
                        <div className="d-flex justify-content-center">
                            Don't have an account? <a href="#" className="ml-2">Sign Up</a>
                        </div>
                        <div className="d-flex justify-content-center">
                            Forgot password? <a href="#" className="ml-2">Reset password</a>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        isAuthenticated: state.auth.authenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (username, password) => dispatch(actions.authenticate(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);