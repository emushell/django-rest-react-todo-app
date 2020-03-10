import * as actionTypes from '../actionTypes';
import { getAllTasks } from '../../services';


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
        return getAllTasks()
            .then(data => {
                dispatch(tasksFetchSuccess(data));
            })
            .catch(error => {
                const { data, status, statusText } = error.response;
                let errorResponse = {
                    data, status, statusText
                };
                dispatch(tasksFetchFail(errorResponse));
            });
    };
};
