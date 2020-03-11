import passwordResetConfirmReducer from '../passwordResetConfirm';
import * as types from '../../actions/actionTypes';

const initialState = {
    error: null,
    loading: false,
};

describe('password reset reducer', () => {

    test('return initial state', () => {
        expect(passwordResetConfirmReducer(undefined, {})).toEqual(initialState);
    });

    test('handle PASSWORD_RESET_CONFIRM_START', () => {

        const startAction = {
            type: types.PASSWORD_RESET_CONFIRM_START
        };

        const mockState = {
            ...initialState,
            loading: true
        };
        expect(passwordResetConfirmReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle PASSWORD_RESET_CONFIRM_SUCCESS', () => {
        const successAction = {
            type: types.PASSWORD_RESET_CONFIRM_SUCCESS
        };
        const mockState = {
            ...initialState
        };
        expect(passwordResetConfirmReducer(initialState, successAction)).toEqual(mockState);
    });

    test('handle PASSWORD_RESET_CONFIRM_FAIL', () => {
        const mockError = {
            data: 'some error',
            status: 400,
            statusText: 'Bad request'
        };
        const failAction = {
            type: types.PASSWORD_RESET_CONFIRM_FAIL,
            error: mockError
        };
        const mockState = {
            ...initialState,
            loading: false,
            error: mockError
        };
        expect(passwordResetConfirmReducer(initialState, failAction)).toEqual(mockState);
    });
});