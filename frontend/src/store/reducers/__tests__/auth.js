import authReducer from '../auth';
import * as types from '../../actions/actionTypes';

const initialState = {
    userId: null,
    username: null,
    authenticated: false,
    error: null,
    loading: false,
};

describe('auth reducer', () => {

    test('return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    test('handle AUTH_START', () => {

        const startAction = {
            type: types.AUTH_START,
        };

        const mockState = {
            ...initialState,
            error: null,
            loading: true
        };

        expect(authReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle AUTH_SUCCESS', () => {
        const updatedState = {
            userId: 1,
            authenticated: true,
            username: 'username'
        };

        const successAction = {
            type: types.AUTH_SUCCESS,
            ...updatedState
        };

        const mockState = {
            ...initialState,
            ...updatedState,
            error: null,
            loading: false
        };
        expect(authReducer(initialState, successAction)).toEqual(mockState);
    });

    test('handle AUTH_LOGOUT', () => {
        const updatedState = {
            userId: 1,
            authenticated: true,
            username: 'username'
        };
        const mockInitialState = {
            ...initialState,
            ...updatedState
        };
        const successAction = {
            type: types.AUTH_LOGOUT
        };

        const mockState = {
            ...initialState,
            userId: null,
            authenticated: false
        };
        expect(authReducer(mockInitialState, successAction)).toEqual(mockState);
    });

    test('handle AUTH_FAIL', () => {
        const mockError = {
            data: 'some error',
            status: 400,
            statusText: 'Bad request'
        };
        const failAction = {
            type: types.AUTH_FAIL,
            error: mockError
        };
        const mockState = {
            ...initialState,
            loading: false,
            error: mockError
        };
        expect(authReducer(initialState, failAction)).toEqual(mockState);
    });
});