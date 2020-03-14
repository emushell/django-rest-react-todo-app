import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../actionTypes';
import * as actions from '../verifyEmail';
import { verifyEmail } from '../../services';

jest.mock('../../services', () => ({
    verifyEmail: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('verify email actions', () => {


    test('action:start', () => {
        const expectedAction = {
            type: types.VERIFY_EMAIL_START
        };
        expect(actions.verifyEmailStart()).toEqual(expectedAction);
    });

    test('action:success', () => {
        const expectedAction = {
            type: types.VERIFY_EMAIL_SUCCESS
        };
        expect(actions.verifyEmailSuccess()).toEqual(expectedAction);
    });

    test('action:fail', () => {
        const error = {
            data: {
                message: 'Error message: Register Fail!!!'
            }
        };
        const expectedAction = {
            type: types.VERIFY_EMAIL_FAIL,
            error: error
        };
        expect(actions.verifyEmailFail(error)).toEqual(expectedAction);
    });

    test('action:verifyEmailWithToken', () => {
        const mockToken = 'aaaabbbbcccc';
        const expectedActions = [
            {
                type: types.VERIFY_EMAIL_START
            },
            {
                type: types.VERIFY_EMAIL_SUCCESS
            }
        ];

        verifyEmail.mockReturnValueOnce(Promise.resolve());

        const store = mockStore({});

        return store.dispatch(actions.verifyEmailWithToken(mockToken))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(verifyEmail).toHaveBeenCalledTimes(1);
                expect(verifyEmail).toHaveBeenCalledWith(mockToken);
            });
    });
});
