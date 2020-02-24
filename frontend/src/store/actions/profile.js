import * as actionTypes from './actionTypes';
import { getProfile } from '../services';

export const profileFetchStart = () => {
    return {
        type: actionTypes.PROFILE_FETCH_START
    };
};

export const profileFetchSuccess = (profile) => {
    return {
        type: actionTypes.PROFILE_FETCH_SUCCESS,
        profile: profile
    };
};

export const profileFetchFail = (error) => {
    return {
        type: actionTypes.PROFILE_FETCH_FAIL,
        error: error
    };
};

export const fetchProfile = () => {
    return (dispatch) => {
        dispatch(profileFetchStart());
        getProfile()
            .then(profile => {
                dispatch(profileFetchSuccess(profile));
            })
            .catch(error => {
                const { data, status, statusText } = error.response;
                let errorResponse = {
                    data, status, statusText
                };
                dispatch(profileFetchFail(errorResponse));
            });
    };
};
