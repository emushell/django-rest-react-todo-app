import { tasksFetchStart, tasksFetchSuccess, tasksFetchFail } from './fetchAll';
import { taskUpdateStart, taskUpdateSuccess, taskUpdateFail } from './update';
import { taskDeleteStart, taskDeleteSuccess, taskDeleteFail } from './delete';
import { taskAddStart, taskAddSuccess, taskAddFail } from './add';
import tasksReducer from './reducer';

export {
    tasksFetchStart,
    tasksFetchSuccess,
    tasksFetchFail,
    taskUpdateStart,
    taskUpdateSuccess,
    taskUpdateFail,
    taskDeleteStart,
    taskDeleteSuccess,
    taskDeleteFail,
    taskAddStart,
    taskAddSuccess,
    taskAddFail,
};

export default tasksReducer;