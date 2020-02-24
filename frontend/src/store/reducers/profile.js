import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
    profile: null,
    error: null,
    loading: false,
};

export const profileFetchStart = (state, action) => {
    return updateObject(
        state,
        {
            error: null,
            loading: true
        }
    );
};

export const profileFetchSuccess = (state, action) => {
    return updateObject(
        state,
        {
            profile: action.profile,
            error: null,
            loading: false,
        }
    );
};

export const profileFetchFail = (state, action) => {
    return updateObject(
        state,
        {
            error: action.error,
            loading: false
        }
    );
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROFILE_FETCH_START:
            return profileFetchStart(state, action);
        case actionTypes.PROFILE_FETCH_SUCCESS:
            return profileFetchSuccess(state, action);
        case actionTypes.PROFILE_FETCH_FAIL:
            return profileFetchFail(state, action);
        default:
            return state;
    }
};

export default profileReducer;