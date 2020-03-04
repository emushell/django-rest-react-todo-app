import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
    error: null,
    loading: false,
};

export const verifyEmailStart = (state, action) => {
    return updateObject(
        state,
        {
            error: null,
            loading: true
        }
    );
};

export const verifyEmailSuccess = (state, action) => {
    return updateObject(
        state,
        {
            error: null,
            loading: false
        }
    );
};

export const verifyEmailFail = (state, action) => {
    return updateObject(
        state,
        {
            loading: false,
            error: action.error
        }
    );
};

const verifyEmailReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VERIFY_EMAIL_START:
            return verifyEmailStart(state, action);
        case actionTypes.VERIFY_EMAIL_SUCCESS:
            return verifyEmailSuccess(state, action);
        case actionTypes.VERIFY_EMAIL_FAIL:
            return verifyEmailFail(state, action);
        default:
            return state;
    }
};

export default verifyEmailReducer;