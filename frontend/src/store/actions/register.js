import * as actionTypes from './actionTypes';
import { postUser } from '../services';

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
};

export const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS
    };
};

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error
    };
};

export const registerUser = (user) => {
    return dispatch => {
        dispatch(registerStart());
        postUser(user)
            .then(data => {
                console.log(data);
                dispatch(registerSuccess());
            })
            .catch(error => {
                const { data, status, statusText } = error.response;
                let errorResponse = {
                    data, status, statusText
                };
                dispatch(registerFail(errorResponse));
            });
    };
};