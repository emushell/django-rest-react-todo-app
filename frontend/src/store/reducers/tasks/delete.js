import { updateObject } from '../../utils';

export const taskDeleteStart = (state, action) => {
    return updateObject(
        state,
        state
    );
};

export const taskDeleteSuccess = (state, action) => {
    return updateObject(
        state,
        state
    );
};

export const taskDeleteFail = (state, action) => {
    return updateObject(
        state,
        {
            error: action.error
        });
};