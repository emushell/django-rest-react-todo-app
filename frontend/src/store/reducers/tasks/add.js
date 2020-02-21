import { updateObject } from '../../utils';

export const taskAddStart = (state, action) => {
    return state;
};

export const taskAddSuccess = (state, action) => {
    return updateObject(
        state,
        {
            tasks: [...state.tasks, action.task]
        }
    );
};

export const taskAddFail = (state, action) => {
    return updateObject(
        state,
        {
            error: action.error
        });
};