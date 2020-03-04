import * as actionTypes from './actionTypes';
import { passwordReset } from '../services';

export const passwordResetStart = () => {
    return {
        type: actionTypes.PASSWORD_RESET_START
    };
};

export const passwordResetSuccess = () => {
    return {
        type: actionTypes.PASSWORD_RESET_SUCCESS
    };
};

export const passwordResetFail = (error) => {
    return {
        type: actionTypes.PASSWORD_RESET_FAIL,
        error
    };
};

export const resetPassword = (email) => {
    return dispatch => {
        dispatch(passwordResetStart());
        passwordReset(email)
            .then(response => {
                    dispatch(passwordResetSuccess);
                }
            )
            .catch(error => {
                const { data, status, statusText } = error.response;
                let errorResponse = {
                    data, status, statusText
                };
                dispatch(passwordResetFail(errorResponse));
            });
    };
};