import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../actionTypes';
import * as actions from '../passwordResetConfirm';
import { passwordResetConfirm } from '../../services';

jest.mock('../../services', () => ({
    passwordResetConfirm: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('password reset confirm actions', () => {


    test('action:start', () => {
        const expectedAction = {
            type: types.PASSWORD_RESET_CONFIRM_START
        };
        expect(actions.passwordResetConfirmStart()).toEqual(expectedAction);
    });

    test('action:success', () => {
        const expectedAction = {
            type: types.PASSWORD_RESET_CONFIRM_SUCCESS
        };
        expect(actions.passwordResetConfirmSuccess()).toEqual(expectedAction);
    });

    test('action:fail', () => {
        const error = {
            data: {
                message: 'Error message: Password reset confirm Fail!!!'
            }
        };
        const expectedAction = {
            type: types.PASSWORD_RESET_CONFIRM_FAIL,
            error: error
        };
        expect(actions.passwordResetConfirmFail(error)).toEqual(expectedAction);
    });

    test('action:resetPassword', () => {
        const mockForm = {
            new_password: 'new_password',
            new_password2: 'new_password2'
        };
        const mockUid = 'asdf1234rewq';
        const mockToken = 'qwertgfdsa';
        const expectedActions = [
            {
                type: types.PASSWORD_RESET_CONFIRM_START
            },
            {
                type: types.PASSWORD_RESET_CONFIRM_SUCCESS,
            }
        ];

        passwordResetConfirm.mockReturnValueOnce(Promise.resolve());

        const store = mockStore({});

        return store.dispatch(actions.confirmPasswordReset(mockForm, mockUid, mockToken))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(passwordResetConfirm).toHaveBeenCalledTimes(1);
                expect(passwordResetConfirm).toHaveBeenCalledWith(mockForm, mockUid, mockToken);
            });
    });
});