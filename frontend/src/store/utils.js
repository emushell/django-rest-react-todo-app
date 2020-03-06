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

export const extractErrorMessages = (props, key) => {
    if (props.error.data[key] instanceof Array) {
        return props.error.data[key].map(item => {
            return item;
        });
    } else if (Object.keys(props.error.data[key]).length) {
        return Object.entries(props.error.data[key]).map(([key, value]) => {
            return `${key}: ${value}`;
        });
    }
};