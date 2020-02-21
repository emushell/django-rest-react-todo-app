import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
    tasks: null,
    error: null,
    loading: true,
};

export const tasksFetchStart = (state, action) => {
    return updateObject(
        state,
        {
            error: null,
            loading: true
        }
    );
};

export const tasksFetchSuccess = (state, action) => {
    return updateObject(
        state,
        {
            tasks: action.tasks,
            error: null,
            loading: false
        }
    );
};

export const tasksFetchFail = (state, action) => {
    return updateObject(
        state,
        {
            error: action.error,
            loading: false
        }
    );
};

export const tasksUpdateDone = (state, action) => {

    const task = { ...state.tasks.find(task => task.id === action.taskId) };
    task.done = !task.done;
    console.log(state);
    return updateObject(state,
        {
            tasks: [...state.tasks.filter(task => task.id !== action.taskId), task]
        });
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TASKS_FETCH_START:
            return tasksFetchStart(state, action);
        case actionTypes.TASKS_FETCH_SUCCESS:
            return tasksFetchSuccess(state, action);
        case actionTypes.TASKS_FETCH_FAIL:
            return tasksFetchFail(state, action);
        case actionTypes.TASKS_UPDATE_DONE:
            return tasksUpdateDone(state, action);
        default:
            return state;
    }
};

export default tasksReducer;