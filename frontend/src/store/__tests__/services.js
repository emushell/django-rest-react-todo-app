import mockAxios from 'jest-mock-axios';
import jwt from 'jwt-decode';
import * as services from '../services';


import * as urls from '../urls';
import { convertObjectToFormData } from '../utils';

jest.mock('jwt-decode');

describe('testing services', () => {

    afterEach(() => {
        mockAxios.reset();
        localStorage.clear();
    });

    test('get all tasks', () => {
        let thenFn = jest.fn();
        let catchFn = jest.fn();

        services.getAllTasks()
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.get).toHaveBeenCalledWith(urls.TASKS_URL);

        // simulating a server response
        let task = { id: 1, title: 'Task' };
        let responseObj = { data: [task] };

        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith([task]);
        expect(catchFn).not.toHaveBeenCalled();
    });

    test('delete task', () => {
        let thenFn = jest.fn();
        let catchFn = jest.fn();
        let mockTaskID = 1;
        services.deleteTask(mockTaskID)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.delete).toHaveBeenCalledWith(urls.TASKS_URL + `${mockTaskID}/`);

        let responseObj = {};

        mockAxios.mockResponse();

        expect(thenFn).toHaveBeenCalledWith(responseObj);
        expect(catchFn).not.toHaveBeenCalled();
    });

    test('update task', () => {
        let thenFn = jest.fn();
        let catchFn = jest.fn();
        let task = { id: 1, title: 'Task' };
        services.putTask(task)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.post).toHaveBeenCalledWith(urls.TASKS_URL + `${task.id}/`, { ...task });

        let responseObj = {};

        mockAxios.mockResponse();

        expect(thenFn).toHaveBeenCalledWith(responseObj);
        expect(catchFn).not.toHaveBeenCalled();
    });

    test('post task', () => {
        let thenFn = jest.fn();
        let catchFn = jest.fn();
        let task = { id: 1, title: 'Task' };
        services.postTask(task)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.post).toHaveBeenCalledWith(urls.TASKS_URL, { ...task });

        let responseObj = {};

        mockAxios.mockResponse();

        expect(thenFn).toHaveBeenCalledWith(responseObj);
        expect(catchFn).not.toHaveBeenCalled();
    });

    test('password reset', () => {
        let thenFn = jest.fn();
        let catchFn = jest.fn();

        let mockEmail = 'test@email.com';
        services.passwordReset(mockEmail)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.post).toHaveBeenCalledWith(urls.PASSWORD_RESET_URL, { email: mockEmail });

        let responseObj = {
            config: {},
            data: null,
            headers: {},
            status: 200,
            statusText: 'OK'
        };

        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith(responseObj);
        expect(catchFn).not.toHaveBeenCalled();
    });

    test('password reset confirm', () => {
        let thenFn = jest.fn();
        let catchFn = jest.fn();

        let mockForm = {
            new_password: 'new_password',
            new_password2: 'new_password'
        };
        let mockUid = 'a3d4f5';
        let mockToken = 'asdfpoiuoasdf';
        services.passwordResetConfirm(mockForm, mockUid, mockToken)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.post).toHaveBeenCalledWith(urls.PASSWORD_RESET_CONFIRM_URL + `${mockUid}/${mockToken}/`, { ...mockForm });

        let responseObj = {
            config: {},
            data: null,
            headers: {},
            status: 200,
            statusText: 'OK'
        };

        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith(responseObj);
        expect(catchFn).not.toHaveBeenCalled();
    });

    test('verify email', () => {
        let thenFn = jest.fn();
        let catchFn = jest.fn();

        let mockToken = 'qqqwwweee';
        services.verifyEmail(mockToken)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.get).toHaveBeenCalledWith(urls.VERIFY_EMAIL_URL + `${mockToken}/`);

        let responseObj = {
            config: {},
            data: null,
            headers: {},
            status: 200,
            statusText: 'OK'
        };

        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith(responseObj);
        expect(catchFn).not.toHaveBeenCalled();
    });

    test('patch profile - no profile pic', () => {
        let thenFn = jest.fn();
        let catchFn = jest.fn();

        let mockProfile = {
            id: 1,
            first_name: 'first_name'
        };
        services.patchProfile(mockProfile)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.patch).toHaveBeenCalledWith(urls.PROFILE_URL + `${mockProfile.id}/`, mockProfile, undefined);

        let responseObj = {};

        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith(responseObj);
        expect(catchFn).not.toHaveBeenCalled();
    });
    test('patch profile - with profile pic', () => {
        let thenFn = jest.fn();
        let catchFn = jest.fn();

        let mockProfile = {
            id: 1,
            first_name: 'first_name',
            profile_pic: new File([''], 'profile_pic.png', { type: 'image/png', lastModified: new Date() })
        };

        let header = {
            headers: {
                'content-type':
                    'multipart/form-data'
            }
        };

        services.patchProfile(mockProfile)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.patch).toHaveBeenCalledWith(urls.PROFILE_URL + `${mockProfile.id}/`, convertObjectToFormData(mockProfile), header);

        let responseObj = {};

        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith(responseObj);
        expect(catchFn).not.toHaveBeenCalled();
    });

    test('get profile', () => {
        let thenFn = jest.fn();
        let catchFn = jest.fn();

        services.getProfile()
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.get).toHaveBeenCalledWith(urls.PROFILE_URL);

        let mockProfile = {
            id: 1,
            first_name: 'first_name',
        };
        let responseObj = { data: [mockProfile] };

        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith(mockProfile);
        expect(catchFn).not.toHaveBeenCalled();
    });

    test('post user', () => {
        let thenFn = jest.fn();
        let catchFn = jest.fn();

        let mockUser = {
            id: 1,
            username: 'username'
        };

        services.postUser(mockUser)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.post).toHaveBeenCalledWith(urls.REGISTER_URL, mockUser);

        let responseObj = { data: mockUser };

        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith(mockUser);
        expect(catchFn).not.toHaveBeenCalled();
    });

    test('logout', () => {

        services.logout();

        expect(localStorage.removeItem).toHaveBeenCalledTimes(3);
        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
        expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
        expect(localStorage.removeItem).toHaveBeenCalledWith('username');

    });

    test('login', () => {

        let thenFn = jest.fn();
        let catchFn = jest.fn();

        let credentials = {
            username: 'username',
            password: 'password'
        };

        services.login(credentials.username, credentials.password)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.post).toHaveBeenCalledWith(urls.LOGIN_URL, credentials);

        let mockJwtReturn = {
            exp: (new Date().getTime()) / 1000 + 5000,
            user_id: 1,
            username: 'username'
        };

        jwt.mockReturnValueOnce(mockJwtReturn);

        let responseObj = {
            data: {
                access: 'aaaaa',
                refresh: 'bbbbb'
            }
        };

        let { user_id: userId, exp: expirationTime, username } = mockJwtReturn;

        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith({ userId, expirationTime, username });
        expect(catchFn).not.toHaveBeenCalled();

        expect(localStorage.setItem).toHaveBeenCalledTimes(3);
        expect(localStorage.setItem).toHaveBeenCalledWith('token', responseObj.data.access);
        expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', responseObj.data.refresh);
        expect(localStorage.setItem).toHaveBeenCalledWith('username', 'username');
    });
});