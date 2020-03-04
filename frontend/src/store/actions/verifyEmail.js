import * as actionTypes from './actionTypes';
import { verifyEmail } from '../services';

export const verifyEmailStart = () => {
    return {
        type: actionTypes.VERIFY_EMAIL_START
    };
};

export const verifyEmailSuccess = () => {
    return {
        type: actionTypes.VERIFY_EMAIL_SUCCESS
    };
};

export const verifyEmailFail = (error) => {
    return {
        type: actionTypes.VERIFY_EMAIL_FAIL,
        error
    };
};

export const verifyEmailWithToken = (token) => {
    return dispatch => {
        dispatch(verifyEmailStart());
        verifyEmail(token)
            .then(response => {
                    dispatch(verifyEmailSuccess);
                }
            )
            .catch(error => {
                const { data, status, statusText } = error.response;
                let errorResponse = {
                    data, status, statusText
                };
                dispatch(verifyEmailFail(errorResponse));
            });
    };
};