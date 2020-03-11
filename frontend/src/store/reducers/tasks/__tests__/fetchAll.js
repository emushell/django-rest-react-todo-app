import tasksReducer from '../reducer';
import * as types from '../../../actions/actionTypes';

const initialState = {
    tasks: [],
    error: null,
    loading: true,
};

describe('task reducer: fetchAll part', () => {

    test('return initial state', () => {
        expect(tasksReducer(undefined, {})).toEqual(initialState);
    });

    test('handle TASKS_FETCH_START', () => {

        const startAction = {
            type: types.TASKS_FETCH_START
        };

        const mockState = {
            ...initialState,
            loading: true
        };
        expect(tasksReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle TASKS_FETCH_SUCCESS', () => {
        const mockTasks = [{ id: 1, title: 'Task 1' }];
        const successAction = {
            type: types.TASKS_FETCH_SUCCESS,
            tasks: mockTasks
        };

        const mockState = {
            ...initialState,
            loading: false,
            tasks: mockTasks
        };
        expect(tasksReducer(initialState, successAction)).toEqual(mockState);
    });

    test('handle TASKS_FETCH_FAIL', () => {
        const mockError = {
            data: 'some error',
            status: 400,
            statusText: 'Bad request'
        };
        const failAction = {
            type: types.TASKS_FETCH_FAIL,
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