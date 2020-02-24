import axios, { setAuthorisationToken } from '../axios-api';
import { LOGIN_URL, PROFILE_URL } from './urls';
import jwt from 'jwt-decode';

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
            const profile = response.data[0];
            return profile;
        });
};


export {
    login,
    logout,
    getProfile
};