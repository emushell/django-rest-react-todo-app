import React from 'react';
import { extractErrorMessages } from '../store/utils';

const FormFieldErrorMessage = (props) => {

    if (props.isFormSubmitted && props.error && props.error.data[props.formElementName]) {
        return (
            <small
                className="form-text text-danger">{extractErrorMessages(props, props.formElementName)}</small>
        );
    }
    return null;
};

export default FormFieldErrorMessage;