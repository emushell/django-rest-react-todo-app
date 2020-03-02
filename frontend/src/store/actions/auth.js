import jwt from 'jwt-decode';
import { setAuthorisationToken } from '../../axios-api';
import * as actionTypes from './actionTypes';
import { login, logout } from '../services';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        authenticated: !!userId,
        username: username
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    logout();
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    const timeInterval = (new Date(expirationTime * 1000).getTime() - new Date().getTime());
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, timeInterval);
    };
};

export const authenticate = (username, password, history) => {
    return (dispatch) => {
        dispatch(authStart());
        login(username, password)
            .then(({ userId, expirationTime, username }) => {
                dispatch(checkAuthTimeout(expirationTime));
                dispatch(authSuccess(userId, username));
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
            const { exp, user_id: userId, username } = jwt(token);
            const expirationTime = new Date(exp * 1000);
            if (expirationTime <= new Date()) {
                dispatch(authLogout());
            } else {
                setAuthorisationToken(token);
                dispatch(authSuccess(userId, username));
            }
        }
    };
};