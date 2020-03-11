import passwordResetReducer from '../passwordReset';
import * as types from '../../actions/actionTypes';

const initialState = {
    error: null,
    loading: false,
};

describe('password reset reducer', () => {

    test('return initial state', () => {
        expect(passwordResetReducer(undefined, {})).toEqual(initialState);
    });

    test('handle PASSWORD_RESET_START', () => {

        const startAction = {
            type: types.PASSWORD_RESET_START
        };

        const mockState = {
            ...initialState,
            loading: true
        };
        expect(passwordResetReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle PASSWORD_RESET_SUCCESS', () => {
        const successAction = {
            type: types.PASSWORD_RESET_SUCCESS
        };
        const mockState = {
            ...initialState
        };
        expect(passwordResetReducer(initialState, successAction)).toEqual(mockState);
    });

    test('handle PASSWORD_RESET_FAIL', () => {
        const mockError = {
            data: 'some error',
            status: 400,
            statusText: 'Bad request'
        };
        const failAction = {
            type: types.PASSWORD_RESET_FAIL,
            error: mockError
        };
        const mockState = {
            ...initialState,
            loading: false,
            error: mockError
        };
        expect(passwordResetReducer(initialState, failAction)).toEqual(mockState);
    });
});