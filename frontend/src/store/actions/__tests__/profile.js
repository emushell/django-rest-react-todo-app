import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../actionTypes';
import * as actions from '../profile';
import { getProfile, patchProfile } from '../../services';

jest.mock('../../services', () => ({
    getProfile: jest.fn(),
    patchProfile: jest.fn()

}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('profile fetch actions', () => {


    test('action:start', () => {
        const expectedAction = {
            type: types.PROFILE_FETCH_START
        };
        expect(actions.profileFetchStart()).toEqual(expectedAction);
    });

    test('action:success', () => {
        const mockProfile = {
            id: 1,
            first_name: 'first_name'
        };
        const expectedAction = {
            type: types.PROFILE_FETCH_SUCCESS,
            profile: mockProfile
        };
        expect(actions.profileFetchSuccess(mockProfile)).toEqual(expectedAction);
    });

    test('action:fail', () => {
        const error = {
            data: {
                message: 'Error message: Profile fetch Fail!!!'
            }
        };
        const expectedAction = {
            type: types.PROFILE_FETCH_FAIL,
            error: error
        };
        expect(actions.profileFetchFail(error)).toEqual(expectedAction);
    });

    test('action:fetchProfile', () => {
        const mockProfile = {
            id: 1,
            first_name: 'first_name'
        };
        const expectedActions = [
            {
                type: types.PROFILE_FETCH_START
            },
            {
                type: types.PROFILE_FETCH_SUCCESS,
                profile: mockProfile
            }
        ];

        getProfile.mockReturnValueOnce(Promise.resolve({ ...mockProfile }));

        const store = mockStore({});

        return store.dispatch(actions.fetchProfile())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(getProfile).toHaveBeenCalledTimes(1);
            });
    });
});

describe('profile update actions', () => {

    test('action:start', () => {
        const expectedAction = {
            type: types.PROFILE_PUT_START
        };
        expect(actions.profilePutStart()).toEqual(expectedAction);
    });

    test('action:success', () => {
        const mockProfile = {
            id: 1,
            first_name: 'first_name'
        };
        const expectedAction = {
            type: types.PROFILE_PUT_SUCCESS,
            profile: mockProfile
        };
        expect(actions.profilePutSuccess(mockProfile)).toEqual(expectedAction);
    });

    test('action:fail', () => {
        const error = {
            data: {
                message: 'Error message: Profile fetch Fail!!!'
            }
        };
        const expectedAction = {
            type: types.PROFILE_PUT_FAIL,
            error: error
        };
        expect(actions.profilePutFail(error)).toEqual(expectedAction);
    });

    test('action:patchProfile', () => {
        const mockProfile = {
            id: 1,
            first_name: 'first_name'
        };
        const expectedActions = [
            {
                type: types.PROFILE_PUT_START
            },
            {
                type: types.PROFILE_PUT_SUCCESS,
                profile: mockProfile
            }
        ];

        patchProfile.mockReturnValueOnce(Promise.resolve({ ...mockProfile }));

        const store = mockStore({});

        return store.dispatch(actions.updateProfile(mockProfile))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(patchProfile).toHaveBeenCalledTimes(1);
                expect(patchProfile).toHaveBeenCalledWith(mockProfile);
            });
    });
});