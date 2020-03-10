import * as actionTypes from '../actionTypes';
import { postTask } from '../../services';

export const taskAddStart = () => {
    return {
        type: actionTypes.TASK_ADD_START
    };
};

export const taskAddSuccess = (task) => {
    return {
        type: actionTypes.TASK_ADD_SUCCESS,
        task: task
    };
};

export const taskAddFail = (error) => {
    return {
        type: actionTypes.TASK_ADD_FAIL,
        error: error
    };
};

export const addTask = (task) => {
    return (dispatch) => {
        dispatch(taskAddStart());
        return postTask(task)
            .then(data => {
                dispatch(taskAddSuccess(data));
            })
            .catch(error => {
                const { data, status, statusText } = error.response;
                let errorResponse = {
                    data, status, statusText
                };
                dispatch(taskAddFail(errorResponse));
            });
    };
};