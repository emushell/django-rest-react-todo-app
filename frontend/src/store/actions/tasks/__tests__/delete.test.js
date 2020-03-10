import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../../actionTypes';
import * as actions from '../delete';
import { deleteTask, getAllTasks } from '../../../services';

jest.mock('../../../services', () => ({
    deleteTask: jest.fn(),
    getAllTasks: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('delete task actions', () => {

    beforeEach(() => {
        deleteTask.mockClear();
        getAllTasks.mockClear();
    });

    test('action:start', () => {
        const expectedAction = {
            type: types.TASK_DELETE_START,
            loading: true
        };
        expect(actions.taskDeleteStart()).toEqual(expectedAction);
    });

    test('action:success', () => {
        const expectedAction = {
            type: types.TASK_DELETE_SUCCESS,
            loading: false
        };
        expect(actions.taskDeleteSuccess()).toEqual(expectedAction);
    });

    test('action:fail', () => {
        const error = {
            data: {
                message: 'Error message'
            }
        };
        const expectedAction = {
            type: types.TASK_DELETE_FAIL,
            loading: false,
            error: error
        };
        expect(actions.taskDeleteFail(error)).toEqual(expectedAction);
    });

    test('action:deleteTask', () => {
        const mockTaskId = 1;
        const expectedActions = [
            {
                type: types.TASK_DELETE_START,
                loading: true
            },
            {
                type: types.TASK_DELETE_SUCCESS,
                loading: false
            },
            {
                type: types.TASKS_FETCH_START
            },
            {
                type: types.TASKS_FETCH_SUCCESS,
                tasks: [{ id: 1, title: 'task 1' }]
            }

        ];

        deleteTask.mockReturnValueOnce(Promise.resolve(mockTaskId));
        getAllTasks.mockReturnValueOnce(Promise.resolve([{ id: 1, title: 'task 1' }]));

        const store = mockStore({ task: {} });

        return store.dispatch(actions.deleteTask(mockTaskId))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(deleteTask.mock.calls.length).toBe(1);
                expect(deleteTask.mock.calls[0][0]).toBe(mockTaskId);
            });
    });

});