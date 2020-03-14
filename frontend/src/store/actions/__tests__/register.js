import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../actionTypes';
import * as actions from '../register';
import { postUser } from '../../services';

jest.mock('../../services', () => ({
    postUser: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('register actions', () => {


    test('action:start', () => {
        const expectedAction = {
            type: types.REGISTER_START
        };
        expect(actions.registerStart()).toEqual(expectedAction);
    });

    test('action:success', () => {
        const expectedAction = {
            type: types.REGISTER_SUCCESS
        };
        expect(actions.registerSuccess()).toEqual(expectedAction);
    });

    test('action:fail', () => {
        const error = {
            data: {
                message: 'Error message: Register Fail!!!'
            }
        };
        const expectedAction = {
            type: types.REGISTER_FAIL,
            error: error
        };
        expect(actions.registerFail(error)).toEqual(expectedAction);
    });

    test('action:registerUser', () => {
        const mockUser = {
            first_name: 'first_name',
            email: 'test@email.com'
        };
        const expectedActions = [
            {
                type: types.REGISTER_START
            },
            {
                type: types.REGISTER_SUCCESS
            }
        ];

        postUser.mockReturnValueOnce(Promise.resolve());

        const history = {
            push: jest.fn()
        };

        const store = mockStore({});

        return store.dispatch(actions.registerUser(mockUser, history))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(postUser).toHaveBeenCalledTimes(1);
                expect(postUser).toHaveBeenCalledWith(mockUser);
            });
    });
});
