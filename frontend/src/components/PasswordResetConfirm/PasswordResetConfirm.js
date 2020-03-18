import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';


import * as actions from '../../store/actions/passwordResetConfirm';
import Card from '../Card';
import { Input } from '../Input';
import { createControlsArray } from '../../store/utils';
import FormFieldErrorMessage from '../FormFieldErrorMessage';

const PasswordResetConfirm = (props) => {

    const { uid, token } = useParams();
    const [passwordForm, setPasswordForm] = useState({});

    const controls = {
        password: {
            elementConfig: {
                type: 'password',
                placeholder: 'New Password...'
            },
            value: '',
            className: 'form-control',
            name: 'new_password',
            icon: {
                className: 'fa fa-lock'
            }
        },
        password2: {
            elementConfig: {
                type: 'password',
                placeholder: 'Re-enter new password...'
            },
            value: '',
            className: 'form-control',
            name: 'new_password2',
            icon: {
                className: 'fa fa-lock'
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswordForm({
            ...passwordForm,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onConfirmPasswordReset(passwordForm, uid, token);
    };

    const controlsArray = createControlsArray(controls);

    const form = controlsArray.map((formElement, index) => {
        return (
            <div key={formElement.id} className="mb-3">
                <div className="input-group">
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
                <FormFieldErrorMessage error={props.error}
                                       isFormSubmitted={true}
                                       formElementName={formElement.config.name} />
            </div>
        );
    });


    return (
        <LoadingOverlay
            active={props.loading}
            spinner
            text='Resetting password...'
        >
            <Card>
                <article className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <h3 className="card-title">Password reset</h3>
                            <p>Enter the new password...</p>
                            {form}
                            <FormFieldErrorMessage error={props.error}
                                                   isFormSubmitted={true}
                                                   formElementName={'non_field_errors'} />
                            <div className="form-group">
                                <button type="submit"
                                        className="btn btn-primary btn-block"
                                        onClick={handleSubmit}>Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </Card>
        </LoadingOverlay>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.psswResetConfirm.loading,
        error: state.psswResetConfirm.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onConfirmPasswordReset: (form, uid, token) => dispatch(actions.confirmPasswordReset(form, uid, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetConfirm);