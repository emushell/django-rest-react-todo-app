import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

export const setAuthorisationToken = (token) => {
    if (token) {
        instance.defaults.headers.common['Authorisation'] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common['Authorisation'];
    }
};

export default instance;