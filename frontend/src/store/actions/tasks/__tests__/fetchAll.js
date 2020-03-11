import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../../actionTypes';
import * as actions from '../fetchAll';
import { getAllTasks } from '../../../services';

// jest.mock('../../services', () => require('../../../__mocks__/services.js'));

jest.mock('../../../services', () => ({
    getAllTasks: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchAll tasks actions', () => {

    beforeEach(() => {
        getAllTasks.mockClear();
    });

    test('action:start', () => {
        const expectedAction = {
            type: types.TASKS_FETCH_START
        };
        expect(actions.tasksFetchStart()).toEqual(expectedAction);
    });

    test('action:success', () => {
        const tasks = [{ id: 1, title: 'task 1' }];
        const expectedAction = {
            type: types.TASKS_FETCH_SUCCESS,
            tasks: tasks
        };
        expect(actions.tasksFetchSuccess(tasks)).toEqual(expectedAction);
    });

    test('action:fail', () => {
        const error = {
            data: {
                message: 'Error message'
            }
        };
        const expectedAction = {
            type: types.TASKS_FETCH_FAIL,
            error: error
        };
        expect(actions.tasksFetchFail(error)).toEqual(expectedAction);
    });

    test('action:fetchTasks', () => {
        const mockTasks = [{ id: 1, title: 'task 1' }];
        const expectedActions = [
            { type: types.TASKS_FETCH_START },
            {
                type: types.TASKS_FETCH_SUCCESS,
                tasks: [...mockTasks]
            }
        ];

        getAllTasks.mockReturnValueOnce(Promise.resolve([...mockTasks]));

        const store = mockStore({ tasks: [] });

        return store.dispatch(actions.fetchTasks())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(getAllTasks.mock.calls.length).toBe(1);
            });
    });
});