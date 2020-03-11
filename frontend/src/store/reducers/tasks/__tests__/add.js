import tasksReducer from '../reducer';
import * as types from '../../../actions/actionTypes';

const initialState = {
    tasks: [],
    error: null,
    loading: true,
};

describe('task reducer: add part', () => {

    test('return initial state', () => {
        expect(tasksReducer(undefined, {})).toEqual(initialState);
    });

    test('handle TASK_ADD_START', () => {

        const startAction = {
            type: types.TASK_ADD_START
        };

        const mockState = {
            ...initialState,
            loading: true
        };
        expect(tasksReducer(initialState, startAction)).toEqual(mockState);
    });

    test('handle TASK_ADD_SUCCESS', () => {
        const mockTasks = [{ id: 1, title: 'Task 1' }];
        const successAction = {
            type: types.TASK_ADD_SUCCESS,
            task: mockTasks[0]
        };

        const mockState = {
            ...initialState,
            loading: false,
            tasks: [...mockTasks]
        };
        expect(tasksReducer(initialState, successAction)).toEqual(mockState);
    });

    test('handle TASK_ADD_FAIL', () => {
        const mockError = {
            data: 'some error',
            status: 400,
            statusText: 'Bad request'
        };
        const failAction = {
            type: types.TASK_ADD_FAIL,
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