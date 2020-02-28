import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Input } from '../Input';
import * as actions from '../../store/actions/register';

import classes from './Registration.module.css';

// todo: add first_name & last_name into registration form

const Registration = (props) => {

    const [user, setUser] = useState({});

    const controls = {
        username: {
            elementConfig: {
                type: 'text',
                placeholder: 'Username'
            },
            value: '',
            className: 'form-control',
            name: 'username',
            icon: {
                className: 'fa fa-user'
            }
        },
        email: {
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            className: 'form-control',
            name: 'email',
            icon: {
                className: 'fa fa-envelope'
            }
        },
        password: {
            elementConfig: {
                type: 'password',
                placeholder: 'Enter password'
            },
            value: '',
            className: 'form-control',
            name: 'password',
            icon: {
                className: 'fa fa-lock'
            }
        },
        password2: {
            elementConfig: {
                type: 'password',
                placeholder: 'Repeat password'
            },
            value: '',
            className: 'form-control',
            name: 'password2',
            icon: {
                className: 'fa fa-lock'
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
        console.log(name, value);
    };

    const handleCreateAccount = (event) => {
        props.onRegisterUser(user);
    };

    const controlsArray = Object.keys(controls).map(key => {
        return { id: key, config: controls[key] };
    });

    const form = controlsArray.map((formElement, index) => {
        return (
            <div key={formElement.id} className="form-group input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i className={formElement.config.icon.className} /> </span>
                </div>
                <Input className={formElement.config.className}
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       name={formElement.config.name}
                       onChange={handleChange}
                />
            </div>
        );
    });

    return (
        <div className="card bg-light mt-1">
            <article className="card-body mx-auto" style={classes.cardWidth}>
                <h4 className="card-title mt-3 text-center">Create Account</h4>
                {form}
                <div className="form-group">
                    <button className="btn btn-primary btn-block" onClick={handleCreateAccount}>Create Account</button>
                </div>
                <div className="mt-4">
                    <div className="d-flex justify-content-center">
                        Already have an account? <Link to="/login" className="ml-2">Login</Link>
                    </div>
                </div>
            </article>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.register.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegisterUser: (user) => dispatch(actions.registerUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);