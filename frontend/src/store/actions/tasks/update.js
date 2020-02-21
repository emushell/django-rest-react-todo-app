import * as actionTypes from '../actionTypes';
import axios from '../../../axios-api';
import { TASKS_URL } from '../../urls';


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
        axios.put(TASKS_URL + `${task.id}/`, { ...task })
            .then(result => {
                let task = result.data;
                dispatch(taskUpdateSuccess(task));
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