export const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    };
};

export const taskSortASC = (t1, t2) => {
    return t1.id - t2.id;
};

export const convertObjectToFormData = (obj) => {
    const form = new FormData();
    for (let key in obj) {
        if (obj[key] instanceof File) {
            form.append(key, obj[key], obj[key].name);
        } else {
            form.append(key, obj[key]);
        }
    }
    return form;
};

export const createControlsArray = (controls) => {
    return Object.keys(controls).map(key => {
        return { id: key, config: controls[key] };
    });
};