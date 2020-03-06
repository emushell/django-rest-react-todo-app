import { updateObject } from '../../utils';

export const taskAddStart = (state, action) => {
    return updateObject(
        state,
        {
            loading: true,
            error: null
        }
    );
};

export const taskAddSuccess = (state, action) => {
    return updateObject(
        state,
        {
            tasks: [...state.tasks, action.task],
            loading: false,
            error: null
        }
    );
};

export const taskAddFail = (state, action) => {
    return updateObject(
        state,
        {
            error: action.error,
            loading: false
        });
};