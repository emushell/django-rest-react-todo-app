import registerReducer from '../register';
import * as types from '../../actions/actionTypes';

const initialState = {
    error: null,
    loading: false
};

describe('register reducer', () => {

    test('return initial state', () => {
        expect(registerReducer(undefined, {})).toEqual(initialState);
    });

    test('handle REGISTER_START', () => {

        const startAction = {
            type: types.REGISTER_START
        };

        const mockState = {
            ...initialState,
            loading: true
        };
        expect(registerReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle REGISTER_SUCCESS', () => {
        const successAction = {
            type: types.REGISTER_SUCCESS
        };
        const mockState = {
            ...initialState
        };
        expect(registerReducer(initialState, successAction)).toEqual(mockState);
    });

    test('handle REGISTER_FAIL', () => {
        const mockError = {
            data: 'some error',
            status: 400,
            statusText: 'Bad request'
        };
        const failAction = {
            type: types.REGISTER_FAIL,
            error: mockError
        };
        const mockState = {
            ...initialState,
            loading: false,
            error: mockError
        };
        expect(registerReducer(initialState, failAction)).toEqual(mockState);
    });
});