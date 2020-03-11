import tasksReducer from '../reducer';
import * as types from '../../../actions/actionTypes';

const initialState = {
    tasks: [],
    error: null,
    loading: true,
};

describe('task reducer: delete part', () => {

    test('return initial state', () => {
        expect(tasksReducer(undefined, {})).toEqual(initialState);
    });

    test('handle TASK_DELETE_START', () => {

        const startAction = {
            type: types.TASK_DELETE_START
        };

        const mockState = {
            ...initialState,
            loading: true
        };
        expect(tasksReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle TASK_DELETE_SUCCESS', () => {
        const mockTasks = [{ id: 1, title: 'Task 1' }];
        const successAction = {
            type: types.TASK_DELETE_SUCCESS,
            tasks: mockTasks
        };

        const mockState = {
            ...initialState,
            loading: false,
            tasks: []
        };
        expect(tasksReducer(initialState, successAction)).toEqual(mockState);
    });

    test('handle TASK_DELETE_FAIL', () => {
        const mockError = {
            data: 'some error',
            status: 400,
            statusText: 'Bad request'
        };
        const failAction = {
            type: types.TASK_DELETE_FAIL,
            error: mockError
        };
        const mockState = {
            ...initialState,
            loading: false,
            error: mockError
        };
        expect(tasksReducer(initialState, failAction)).toEqual(mockState);
    });
});