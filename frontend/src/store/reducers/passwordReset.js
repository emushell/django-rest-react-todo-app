import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
    error: null,
    loading: false,
};

export const passwordResetStart = (state, action) => {
    return updateObject(
        state,
        {
            error: null,
            loading: true
        }
    );
};

export const passwordResetSuccess = (state, action) => {
    return updateObject(
        state,
        {
            error: null,
            loading: false
        }
    );
};

export const passwordResetFail = (state, action) => {
    return updateObject(
        state,
        {
            loading: false,
            error: action.error
        }
    );
};

const passwordResetReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PASSWORD_RESET_START:
            return passwordResetStart(state, action);
        case actionTypes.PASSWORD_RESET_SUCCESS:
            return passwordResetSuccess(state, action);
        case actionTypes.PASSWORD_RESET_FAIL:
            return passwordResetFail(state, action);
        default:
            return state;
    }
};

export default passwordResetReducer;