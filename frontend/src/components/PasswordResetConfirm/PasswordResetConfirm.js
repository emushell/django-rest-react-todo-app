import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';


import * as actions from '../../store/actions/passwordResetConfirm';

// TODO: error handling

const PasswordResetConfirm = (props) => {

    const { uid, token } = useParams();
    const [form, setForm] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onConfirmPasswordReset(form, uid, token);
    };

    return (
        <LoadingOverlay
            active={props.loading}
            spinner
            text='Resetting password...'
        >
            <div className="card bg-light mt-1">
                <article className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <h3 className="card-title">Password reset</h3>
                            <p>Enter the new password... {uid} {token}</p>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                                </div>
                                <input className="form-control" type="password"
                                       name="new_password"
                                       placeholder="New Password..."
                                       onChange={handleChange} />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                                </div>
                                <input className="form-control" type="password"
                                       name="new_password2"
                                       placeholder="Re-enter new password..."
                                       onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"
                                        onClick={handleSubmit}>Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </LoadingOverlay>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.psswResetConfirm.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onConfirmPasswordReset: (form, uid, token) => dispatch(actions.confirmPasswordReset(form, uid, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetConfirm);