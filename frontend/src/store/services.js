import axios, { setAuthorisationToken } from '../axios-api';
import { LOGIN_URL, PROFILE_URL, REGISTER_URL, VERIFY_EMAIL_URL } from './urls';
import jwt from 'jwt-decode';
import { convertObjectToFormData } from './utils';

const postUser = (user) => {
    return axios.post(REGISTER_URL, user)
        .then(response => {
            return response.data;
        });
};

const login = (username, password) => {

    return axios.post(LOGIN_URL, { username, password })
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
    return axios.get(PROFILE_URL)
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

    return axios.patch(PROFILE_URL + `${profileId}/`, data, header)
        .then(response => {
            return response.data;
        });
};


const verifyEmail = (token) => {
    return axios.get(VERIFY_EMAIL_URL + `${token}/`)
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
    verifyEmail
};