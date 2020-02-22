import { updateObject } from '../../utils';

export const taskUpdateStart = (state, action) => {
    return updateObject(
        state,
        { loading: true }
    );
};

export const taskUpdateSuccess = (state, action) => {
    return updateObject(
        state,
        {
            tasks: [...state.tasks.filter(task => task.id !== action.task.id), action.task],
            loading: false
        });
};

export const taskUpdateFail = (state, action) => {
    return updateObject(
        state,
        {
            error: action.error,
            loading: false
        });
};