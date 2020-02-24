import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
    userId: null,
    username: null,
    authenticated: false,
    error: null,
    loading: false,
};

export const authStart = (state, action) => {
    return updateObject(
        state,
        {
            error: null,
            loading: true
        }
    );
};

export const authSuccess = (state, action) => {
    return updateObject(
        state,
        {
            userId: action.userId,
            authenticated: action.authenticated,
            username: action.username,
            error: null,
            loading: false,
        }
    );
};

export const authFail = (state, action) => {
    return updateObject(
        state,
        {
            error: action.error,
            loading: false
        }
    );
};

export const authLogout = (state, action) => {
    return updateObject(
        state,
        {
            userId: null,
            authenticated: false
        }
    );
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
};

export default authReducer;