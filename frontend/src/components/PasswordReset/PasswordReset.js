import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/passwordReset';
import Card from '../Card';

const PasswordReset = (props) => {

    const [email, setEmail] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmail(value);
    };

    const handleButtonSubmit = (event) => {
        event.preventDefault();
        props.onResetPassword(email);
        setSubmitted(true);
    };

    let content = (
        <>
            <p className="card-text">Forgotten your password? Enter your email address below, and we’ll email
                instructions for setting a new one.</p>
            <div className="row">
                <div className="col-md-5">
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-envelope" /> </span>
                        </div>
                        <input className="form-control" type="email" name="email" placeholder="Email..."
                               onChange={handleChange} />
                        <div className="input-group-append">
                            <button onClick={handleButtonSubmit} className="btn btn-primary btn-block"
                                    type="button">Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    if (submitted) {
        content = (
            <p className="card-text">Password reset email has been sent, please fallow instruction in your email.</p>
        );
    }

    return (
        <Card>
            <article className="card-body">
                <h3 className="card-title">Password reset</h3>
                {content}
            </article>
        </Card>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.psswReset.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetPassword: (email) => dispatch(actions.resetPassword(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);