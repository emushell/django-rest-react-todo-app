import axios, { setAuthorisationToken } from '../axios-api';
import * as urls from './urls';
import jwt from 'jwt-decode';
import { convertObjectToFormData } from './utils';

const postUser = (user) => {
    return axios.post(urls.REGISTER_URL, user)
        .then(response => {
            return response.data;
        });
};

const login = (username, password) => {

    return axios.post(urls.LOGIN_URL, { username, password })
        .then(response => {
            let { access: token, refresh: refreshToken } = response.data;
            const { user_id: userId, exp: expirationTime, username } = jwt(token);
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('username', username);
            setAuthorisationToken(token);
            return { userId, expirationTime, username };
        });
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    setAuthorisationToken(null);
};

const getProfile = () => {
    return axios.get(urls.PROFILE_URL)
        .then(response => {
            return response.data[0];
        });
};

const patchProfile = (profile) => {

    let data, profileId, header;
    if (profile.profile_pic && (profile.profile_pic instanceof File)) {
        data = convertObjectToFormData(profile);
        profileId = data.get('id');
        header = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
    } else {
        data = { ...profile };
        profileId = data.id;
    }

    return axios.patch(urls.PROFILE_URL + `${profileId}/`, data, header)
        .then(response => {
            return response.data;
        });
};


const verifyEmail = (token) => {
    return axios.get(urls.VERIFY_EMAIL_URL + `${token}/`)
        .then(
            response => {
                return response;
            }
        );
};

const passwordReset = (email) => {
    return axios.post(urls.PASSWORD_RESET_URL, { email })
        .then(
            response => {
                return response;
            }
        );
};

export {
    login,
    logout,
    getProfile,
    patchProfile,
    postUser,
    verifyEmail,
    passwordReset
};