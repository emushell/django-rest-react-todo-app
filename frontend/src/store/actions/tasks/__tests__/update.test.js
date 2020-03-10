import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../../actionTypes';
import * as actions from '../update';
import { putTask } from '../../../services';


jest.mock('../../../services', () => ({
    putTask: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('update task actions', () => {

    beforeEach(() => {
        putTask.mockClear();
    });

    test('action:start', () => {
        const expectedAction = {
            type: types.TASK_UPDATE_START
        };
        expect(actions.taskUpdateStart()).toEqual(expectedAction);
    });

    test('action:success', () => {
        const task = { id: 1, title: 'task 1' };
        const expectedAction = {
            type: types.TASK_UPDATE_SUCCESS,
            task: task
        };
        expect(actions.taskUpdateSuccess(task)).toEqual(expectedAction);
    });

    test('action:fail', () => {
        const error = {
            data: {
                message: 'Error message'
            }
        };
        const expectedAction = {
            type: types.TASK_UPDATE_FAIL,
            error: error
        };
        expect(actions.taskUpdateFail(error)).toEqual(expectedAction);
    });

    test('action:updateTask', () => {
        const mockTask = { id: 1, title: 'task 1' };
        const expectedActions = [
            {
                type: types.TASK_UPDATE_START
            },
            {
                type: types.TASK_UPDATE_SUCCESS,
                task: { ...mockTask }
            }
        ];

        putTask.mockReturnValueOnce(Promise.resolve({ ...mockTask }));

        const store = mockStore({ task: {} });

        return store.dispatch(actions.updateTask(mockTask))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                expect(putTask.mock.calls.length).toBe(1);
                expect(putTask.mock.calls[0][0]).toBe(mockTask);
            });
    });

});