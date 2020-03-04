import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { passwordResetConfirm } from '../../store/services';
import LoadingOverlay from 'react-loading-overlay';

// TODO: error handling

const PasswordResetConfirm = () => {

    const { uid, token } = useParams();
    const [form, setForm] = useState({});
    const [submit, setSubmit] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        passwordResetConfirm(form, uid, token)
            .then(response => {
                console.log(response);
                setSubmit(false);
            })
            .catch(error => {
                console.log(error.response);
                setSubmit(false);
            });
        setSubmit(true);
    };

    return (
        <LoadingOverlay
            active={submit}
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

export default PasswordResetConfirm;