import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../actionTypes';
import * as actions from '../auth';
import { login, logout } from '../../services';
import jwt from 'jwt-decode';

jest.mock('../../services', () => ({
    login: jest.fn(),
    logout: jest.fn()
}));

jest.mock('jwt-decode');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {

    beforeEach(() => {
        login.mockClear();
        logout.mockClear();
        localStorage.getItem.mockClear()
    });

    test('action:start', () => {
        const expectedAction = {
            type: types.AUTH_START
        };
        expect(actions.authStart()).toEqual(expectedAction);
    });

    test('action:success', () => {
        const mockUserId = 1;
        const mockUsername = 'username';
        const expectedAction = {
            type: types.AUTH_SUCCESS,
            userId: mockUserId,
            authenticated: !!mockUserId,
            username: mockUsername
        };
        expect(actions.authSuccess(mockUserId, mockUsername)).toEqual(expectedAction);
    });

    test('action:fail', () => {
        const error = {
            data: {
                message: 'Error message: Auth Fail!!!'
            }
        };
        const expectedAction = {
            type: types.AUTH_FAIL,
            error: error
        };
        expect(actions.authFail(error)).toEqual(expectedAction);
    });

    test('action:logout', () => {
        const expectedAction = {
            type: types.AUTH_LOGOUT
        };
        expect(actions.authLogout()).toEqual(expectedAction);
        expect(logout).toHaveBeenCalledTimes(1);
    });

    test('action:authenticate', () => {
        const mockUsername = 'username';
        const mockPassword = 'password';

        const expectedActions = [
            {
                type: types.AUTH_START
            },
            {
                type: types.AUTH_SUCCESS,
                userId: 1,
                username: mockUsername,
                authenticated: true
            }
        ];

        login.mockReturnValueOnce(Promise.resolve(
            {
                userId: 1,
                expirationTime: (new Date().getTime() / 1000),
                username: mockUsername
            }));

        const store = mockStore({});

        return store.dispatch(actions.authenticate(mockUsername, mockPassword))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(login).toHaveBeenCalledTimes(1);
                expect(login).toHaveBeenCalledWith(mockUsername, mockPassword);
            });
    });

    test('action:authCheckLoginState - with empty token', () => {
        localStorage.getItem.mockReturnValueOnce(null);
        const expectedActions = [
            {
                type: types.AUTH_LOGOUT
            }
        ];

        const store = mockStore({});
        store.dispatch(actions.authCheckLoginState());
        expect(store.getActions()).toEqual(expectedActions);
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledWith('token');

    });

    test('action:authCheckLoginState - with token: expiration time expired', () => {
        const token = 'aaaa.dddd.cccc';
        const expectedActions = [
            {
                type: types.AUTH_LOGOUT
            }
        ];

        localStorage.getItem.mockReturnValueOnce(token);
        jwt.mockReturnValueOnce({
            exp: (new Date().getTime()) / 1000,
            user_id: 1,
            username: 'username'
        });

        const store = mockStore({});
        store.dispatch(actions.authCheckLoginState());
        expect(store.getActions()).toEqual(expectedActions);
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledWith('token');

    });

    test('action:authCheckLoginState - with token', () => {
        const token = 'aaaa.dddd.cccc';
        const expectedActions = [
            {
                type: types.AUTH_SUCCESS,
                userId: 1,
                username: 'username',
                authenticated: true
            }
        ];

        localStorage.getItem.mockReturnValueOnce(token);

        jwt.mockReturnValueOnce({
            exp: (new Date().getTime()) / 1000 + 5000,
            user_id: 1,
            username: 'username'
        });

        const store = mockStore({});
        store.dispatch(actions.authCheckLoginState());
        expect(store.getActions()).toEqual(expectedActions);
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledWith('token');
    });
});