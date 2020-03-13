import * as actionTypes from './actionTypes';
import { passwordResetConfirm } from '../services';

export const passwordResetConfirmStart = () => {
    return {
        type: actionTypes.PASSWORD_RESET_CONFIRM_START
    };
};

export const passwordResetConfirmSuccess = () => {
    return {
        type: actionTypes.PASSWORD_RESET_CONFIRM_SUCCESS
    };
};

export const passwordResetConfirmFail = (error) => {
    return {
        type: actionTypes.PASSWORD_RESET_CONFIRM_FAIL,
        error
    };
};

export const confirmPasswordReset = (form, uid, token) => {
    return dispatch => {
        dispatch(passwordResetConfirmStart());
        return passwordResetConfirm(form, uid, token)
            .then(response => {
                    dispatch(passwordResetConfirmSuccess());
                }
            )
            .catch(error => {
                const { data, status, statusText } = error.response;
                let errorResponse = {
                    data, status, statusText
                };
                dispatch(passwordResetConfirmFail(errorResponse));
            });
    };
};