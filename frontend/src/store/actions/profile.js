import * as actionTypes from './actionTypes';
import { getProfile, patchProfile } from '../services';

export const profileFetchStart = () => {
    return {
        type: actionTypes.PROFILE_FETCH_START
    };
};

export const profileFetchSuccess = (profile) => {
    return {
        type: actionTypes.PROFILE_FETCH_SUCCESS,
        profile
    };
};

export const profileFetchFail = (error) => {
    return {
        type: actionTypes.PROFILE_FETCH_FAIL,
        error
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

export const profileUpdate = (profile) => {
    return {
        type: actionTypes.PROFILE_UPDATE,
        profile
    };
};

export const profilePutStart = () => {
    return {
        type: actionTypes.PROFILE_PUT_START
    };
};

export const profilePutSuccess = (profile) => {
    return {
        type: actionTypes.PROFILE_PUT_SUCCESS,
        profile
    };
};

export const profilePutFail = (error) => {
    return {
        type: actionTypes.PROFILE_PUT_FAIL,
        error
    };
};

export const updateProfile = (profile) => {
    return (dispatch) => {
        dispatch(profilePutStart());
        patchProfile(profile)
            .then(profile => {
                dispatch(profilePutSuccess(profile));
            })
            .catch(error => {
                const { data, status, statusText } = error.response;
                let errorResponse = {
                    data, status, statusText
                };
                dispatch(profilePutFail(errorResponse));
            });
    };
};