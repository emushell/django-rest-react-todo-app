import { updateObject } from '../../utils';

export const taskDeleteStart = (state, action) => {
    return updateObject(
        state,
        {
            loading: true
        }
    );
};

export const taskDeleteSuccess = (state, action) => {
    return updateObject(
        state,
        {
            ...state,
            loading: false
        }
    );
};

export const taskDeleteFail = (state, action) => {
    return updateObject(
        state,
        {
            error: action.error,
            loading: action.loading
        });
};