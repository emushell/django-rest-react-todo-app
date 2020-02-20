import jwt from 'jwt-decode';
import axios, { setAuthorisationToken } from '../../axios-api';
import * as actionTypes from './actionTypes';

const LOGIN_URL = 'api/login/';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        authenticated: !!userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};


export const authenticate = (username, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const credentials = {
            username,
            password
        };
        axios.post(LOGIN_URL, credentials)
            .then(response => {
                let { access: token, refresh: refreshToken } = response.data;
                const { user_id: userId } = jwt(token);
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                setAuthorisationToken(token);
                dispatch(authSuccess(userId));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    };
};