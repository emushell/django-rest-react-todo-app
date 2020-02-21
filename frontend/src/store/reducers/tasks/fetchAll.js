import { updateObject } from '../../utils';

export const tasksFetchStart = (state, action) => {
    return updateObject(
        state,
        {
            error: null,
            loading: true
        }
    );
};

export const tasksFetchSuccess = (state, action) => {
    return updateObject(
        state,
        {
            tasks: action.tasks,
            error: null,
            loading: false
        }
    );
};

export const tasksFetchFail = (state, action) => {
    return updateObject(
        state,
        {
            error: action.error,
            loading: false
        }
    );
};