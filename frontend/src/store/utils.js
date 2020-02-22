export const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    };
};

export const taskSortASC = (t1, t2) => {
    return t1.id - t2.id;
};