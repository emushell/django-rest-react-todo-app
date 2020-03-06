import { updateObject } from '../../utils';

export const taskDeleteStart = (state, action) => {
    return updateObject(
        state,
        {
            loading: true,
            error: null
        }
    );
};

export const taskDeleteSuccess = (state, action) => {
    return updateObject(
        state,
        {
            ...state,
            loading: false,
            error: null
        }
    );
};

export const taskDeleteFail = (state, action) => {
    return updateObject(
        state,
        {
            error: action.error,
            loading: false
        });
};