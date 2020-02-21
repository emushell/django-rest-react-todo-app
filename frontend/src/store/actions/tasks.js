import * as actionTypes from './actionTypes';
import axios from '../../axios-api';

const TASKS_URL = 'api/tasks/';

export const tasksFetchStart = () => {
    return {
        type: actionTypes.TASKS_FETCH_START
    };
};

export const tasksFetchSuccess = (tasks) => {
    return {
        type: actionTypes.TASKS_FETCH_SUCCESS,
        tasks: tasks
    };
};

export const tasksFetchFail = (error) => {
    return {
        type: actionTypes.TASKS_FETCH_FAIL,
        error: error
    };
};

export const fetchTasks = () => {
    return (dispatch) => {
        dispatch(tasksFetchStart());
        axios.get(TASKS_URL)
            .then(result => {
                dispatch(tasksFetchSuccess(result.data));
            })
            .catch(error => {
                dispatch(tasksFetchFail(error));
            });
    };
};

export const tasksUpdateDone = (taskId) => {
    return {
        type: actionTypes.TASKS_UPDATE_DONE,
        taskId: taskId
    };
};