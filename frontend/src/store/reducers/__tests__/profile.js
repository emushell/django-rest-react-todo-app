import profileReducer from '../profile';
import * as types from '../../actions/actionTypes';

const initialState = {
    profile: null,
    error: null,
    loading: true,
};

describe('profile reducer', () => {

    test('return initial state', () => {
        expect(profileReducer(undefined, {})).toEqual(initialState);
    });

    test('handle PROFILE_FETCH_START', () => {

        const startAction = {
            type: types.PROFILE_FETCH_START,
        };

        const mockState = {
            ...initialState,
            loading: true
        };

        expect(profileReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle PROFILE_FETCH_SUCCESS', () => {

        const mockProfile = {
            id: 1,
            username: 'username'
        };

        const startAction = {
            type: types.PROFILE_FETCH_SUCCESS,
            profile: { ...mockProfile }
        };

        const mockState = {
            ...initialState,
            loading: false,
            profile: mockProfile
        };

        expect(profileReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle PROFILE_FETCH_FAIL', () => {
        const mockError = {
            data: 'some error',
            status: 400,
            statusText: 'Bad request'
        };
        const failAction = {
            type: types.PROFILE_FETCH_FAIL,
            error: mockError
        };
        const mockState = {
            ...initialState,
            loading: false,
            error: mockError
        };
        expect(profileReducer(initialState, failAction)).toEqual(mockState);
    });

    test('handle PROFILE_PUT_START', () => {

        const startAction = {
            type: types.PROFILE_PUT_START,
        };

        const mockState = {
            ...initialState,
            loading: true
        };

        expect(profileReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle PROFILE_PUT_SUCCESS', () => {

        const mockProfile = {
            id: 1,
            username: 'username'
        };

        const startAction = {
            type: types.PROFILE_PUT_SUCCESS,
            profile: { ...mockProfile }
        };

        const mockState = {
            ...initialState,
            loading: false,
            profile: mockProfile
        };

        expect(profileReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle PROFILE_PUT_FAIL', () => {
        const mockError = {
            data: 'some error',
            status: 400,
            statusText: 'Bad request'
        };
        const failAction = {
            type: types.PROFILE_PUT_FAIL,
            error: mockError
        };
        const mockState = {
            ...initialState,
            loading: false,
            error: mockError
        };
        expect(profileReducer(initialState, failAction)).toEqual(mockState);
    });
});