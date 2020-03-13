import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../actionTypes';
import * as actions from '../passwordReset';
import { passwordReset } from '../../services';

jest.mock('../../services', () => ({
    passwordReset: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('password reset actions', () => {


    test('action:start', () => {
        const expectedAction = {
            type: types.PASSWORD_RESET_START
        };
        expect(actions.passwordResetStart()).toEqual(expectedAction);
    });

    test('action:success', () => {
        const expectedAction = {
            type: types.PASSWORD_RESET_SUCCESS
        };
        expect(actions.passwordResetSuccess()).toEqual(expectedAction);
    });

    test('action:fail', () => {
        const error = {
            data: {
                message: 'Error message: Password reset Fail!!!'
            }
        };
        const expectedAction = {
            type: types.PASSWORD_RESET_FAIL,
            error: error
        };
        expect(actions.passwordResetFail(error)).toEqual(expectedAction);
    });

    test('action:resetPassword', () => {
        const mockEmail = 'test@email.com';
        const expectedActions = [
            {
                type: types.PASSWORD_RESET_START
            },
            {
                type: types.PASSWORD_RESET_SUCCESS,
            }
        ];

        passwordReset.mockReturnValueOnce(Promise.resolve());

        const store = mockStore({});

        return store.dispatch(actions.resetPassword(mockEmail))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(passwordReset).toHaveBeenCalledTimes(1);
                expect(passwordReset).toHaveBeenCalledWith(mockEmail);
            });
    });
});