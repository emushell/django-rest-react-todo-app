import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
    error: null,
    loading: false,
};

export const passwordResetConfirmStart = (state, action) => {
    return updateObject(
        state,
        {
            error: null,
            loading: true
        }
    );
};

export const passwordResetConfirmSuccess = (state, action) => {
    return updateObject(
        state,
        {
            error: null,
            loading: false
        }
    );
};

export const passwordResetConfirmFail = (state, action) => {
    return updateObject(
        state,
        {
            loading: false,
            error: action.error
        }
    );
};

const passwordResetConfirmReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PASSWORD_RESET_CONFIRM_START:
            return passwordResetConfirmStart(state, action);
        case actionTypes.PASSWORD_RESET_CONFIRM_SUCCESS:
            return passwordResetConfirmSuccess(state, action);
        case actionTypes.PASSWORD_RESET_CONFIRM_FAIL:
            return passwordResetConfirmFail(state, action);
        default:
            return state;
    }
};

export default passwordResetConfirmReducer;