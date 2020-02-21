import * as actionTypes from '../actionTypes';
import axios from '../../../axios-api';
import { TASKS_URL } from '../../urls';

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
        axios.post(TASKS_URL, task)
            .then(result => {
                console.log(result.data);
                let task = result.data;
                dispatch(taskAddSuccess(task));
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