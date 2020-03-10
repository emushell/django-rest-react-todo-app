import * as actionTypes from '../actionTypes';
import { putTask } from '../../services';


export const taskUpdateStart = () => {
    return {
        type: actionTypes.TASK_UPDATE_START
    };
};

export const taskUpdateSuccess = (task) => {
    return {
        type: actionTypes.TASK_UPDATE_SUCCESS,
        task: task
    };
};

export const taskUpdateFail = (error) => {
    return {
        type: actionTypes.TASK_UPDATE_FAIL,
        error: error
    };
};

export const updateTask = (task) => {
    return (dispatch) => {
        dispatch(taskUpdateStart(task));
        return putTask(task)
            .then(data => {
                dispatch(taskUpdateSuccess(data));
            })
            .catch(error => {
                const { data, status, statusText } = error.response;
                let errorResponse = {
                    data, status, statusText
                };
                dispatch(taskUpdateFail(errorResponse));
            });
    };
};