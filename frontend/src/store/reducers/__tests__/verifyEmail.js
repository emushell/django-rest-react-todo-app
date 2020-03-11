import verifyEmailReducer from '../verifyEmail';
import * as types from '../../actions/actionTypes';

const initialState = {
    error: null,
    loading: false
};

describe('verify email reducer', () => {

    test('return initial state', () => {
        expect(verifyEmailReducer(undefined, {})).toEqual(initialState);
    });

    test('handle VERIFY_EMAIL_START', () => {

        const startAction = {
            type: types.VERIFY_EMAIL_START
        };

        const mockState = {
            ...initialState,
            loading: true
        };
        expect(verifyEmailReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle VERIFY_EMAIL_SUCCESS', () => {
        const successAction = {
            type: types.VERIFY_EMAIL_SUCCESS
        };
        const mockState = {
            ...initialState
        };
        expect(verifyEmailReducer(initialState, successAction)).toEqual(mockState);
    });

    test('handle VERIFY_EMAIL_FAIL', () => {
        const mockError = {
            data: 'some error',
            status: 400,
            statusText: 'Bad request'
        };
        const failAction = {
            type: types.VERIFY_EMAIL_FAIL,
            error: mockError
        };
        const mockState = {
            ...initialState,
            loading: false,
            error: mockError
        };
        expect(verifyEmailReducer(initialState, failAction)).toEqual(mockState);
    });
});