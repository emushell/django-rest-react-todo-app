import * as actionTypes from '../../actions/actionTypes';
import * as reducers from './index';

const initialState = {
    tasks: [],
    error: null,
    loading: true,
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TASKS_FETCH_START:
            return reducers.tasksFetchStart(state, action);
        case actionTypes.TASKS_FETCH_SUCCESS:
            return reducers.tasksFetchSuccess(state, action);
        case actionTypes.TASKS_FETCH_FAIL:
            return reducers.tasksFetchFail(state, action);
        case actionTypes.TASK_ADD_START:
            return reducers.taskAddStart(state, action);
        case actionTypes.TASK_ADD_SUCCESS:
            return reducers.taskAddSuccess(state, action);
        case actionTypes.TASK_ADD_FAIL:
            return reducers.taskAddFail(state, action);
        case actionTypes.TASK_UPDATE_START:
            return reducers.taskUpdateStart(state, action);
        case actionTypes.TASK_UPDATE_SUCCESS:
            return reducers.taskUpdateSuccess(state, action);
        case actionTypes.TASK_UPDATE_FAIL:
            return reducers.taskUpdateFail(state, action);
        case actionTypes.TASK_DELETE_START:
            return reducers.taskDeleteStart(state, action);
        case actionTypes.TASK_DELETE_SUCCESS:
            return reducers.taskDeleteSuccess(state, action);
        case actionTypes.TASK_DELETE_FAIL:
            return reducers.taskDeleteFail(state, action);
        default:
            return state;
    }
};

export default tasksReducer;