import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../../actionTypes';
import * as actions from '../add';
import { postTask } from '../../../services';

jest.mock('../../../services', () => ({
    postTask: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('add task actions', () => {

    beforeEach(() => {
        postTask.mockClear();
    });

    test('action:start', () => {
        const expectedAction = {
            type: types.TASK_ADD_START
        };
        expect(actions.taskAddStart()).toEqual(expectedAction);
    });

    test('action:success', () => {
        const task = { id: 1, title: 'task 1' };
        const expectedAction = {
            type: types.TASK_ADD_SUCCESS,
            task: task
        };
        expect(actions.taskAddSuccess(task)).toEqual(expectedAction);
    });

    test('action:fail', () => {
        const error = {
            data: {
                message: 'Error message'
            }
        };
        const expectedAction = {
            type: types.TASK_ADD_FAIL,
            error: error
        };
        expect(actions.taskAddFail(error)).toEqual(expectedAction);
    });

    test('action:addTask', () => {
        const mockTask = { id: 1, title: 'task 1' };
        const expectedActions = [
            { type: types.TASK_ADD_START },
            {
                type: types.TASK_ADD_SUCCESS,
                task: { ...mockTask }
            }
        ];

        postTask.mockReturnValueOnce(Promise.resolve({ ...mockTask }));

        const store = mockStore({ task: {} });

        return store.dispatch(actions.addTask(mockTask))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(postTask.mock.calls.length).toBe(1);
                expect(postTask.mock.calls[0][0]).toBe(mockTask);
            });
    });

});