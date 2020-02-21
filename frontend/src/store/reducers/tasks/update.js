import { updateObject } from '../../utils';

export const taskUpdateStart = (state, action) => {
    return updateObject(
        state,
        state
    );
};

export const taskUpdateSuccess = (state, action) => {
    return updateObject(
        state,
        {
            tasks: [...state.tasks.filter(task => task.id !== action.task.id), action.task]
        });
};

export const taskUpdateFail = (state, action) => {
    return updateObject(
        state,
        {
            error: action.error
        });
};