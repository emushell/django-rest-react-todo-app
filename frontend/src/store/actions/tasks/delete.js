import * as actionTypes from '../actionTypes';
import axios from '../../../axios-api';
import { TASKS_URL } from '../../urls';
import { fetchTasks } from './fetchAll';

export const taskDeleteStart = () => {
    return {
        type: actionTypes.TASK_DELETE_START
    };
};

export const taskDeleteSuccess = () => {
    return {
        type: actionTypes.TASK_DELETE_SUCCESS
    };
};

export const taskDeleteFail = (error) => {
    return {
        type: actionTypes.TASK_DELETE_FAIL,
        error: error
    };
};

export const deleteTask = (taskId) => {
    return (dispatch) => {
        dispatch(taskDeleteStart());
        axios.delete(TASKS_URL + `${taskId}/`)
            .then(result => {
                console.log(result.data);
                // let task = result.data;
                dispatch(taskDeleteSuccess());
                return Promise.resolve();
            })
            .then(() => {
                dispatch(fetchTasks());
            })
            .catch(error => {
                const { data, status, statusText } = error.response;
                let errorResponse = {
                    data, status, statusText
                };
                dispatch(taskDeleteFail(errorResponse));
            });
    };
};