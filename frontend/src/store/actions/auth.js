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
    setAuthorisationToken(null);
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
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
                const { user_id: userId, exp: expirationTime } = jwt(token);
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                setAuthorisationToken(token);
                dispatch(authSuccess(userId));
                dispatch(checkAuthTimeout(expirationTime));
            })
            .catch(error => {
                const { data, status, statusText } = error.response;
                let errorResponse = {
                    data, status, statusText
                };
                dispatch(authFail(errorResponse));
            });
    };
};


export const authCheckLoginState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const { exp, user_id: userId } = jwt(token);
            const expirationTime = new Date(exp * 1000);
            if (expirationTime <= new Date()) {
                dispatch(authLogout());
            } else {
                setAuthorisationToken(token);
                dispatch(authSuccess(userId));
            }
        }
    };
};