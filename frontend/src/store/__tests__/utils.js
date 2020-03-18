import * as utils from '../utils';

describe('', () => {

    test('updateObject', () => {

        let object1 = {
            a: 1,
            b: 3
        };

        let object2 = {
            c: 3,
            d: 4
        };

        expect(utils.updateObject(object1, object2)).toEqual({ ...object1, ...object2 });
    });

    test('taskSortASC', () => {

        let tasks = [
            { id: 3, title: 'Task 3' },
            { id: 2, title: 'Task 2' },
            { id: 1, title: 'Task 1' }
        ];

        let sortedTasks = [
            { id: 1, title: 'Task 1' },
            { id: 2, title: 'Task 2' },
            { id: 3, title: 'Task 3' }
        ];

        expect(tasks.sort(utils.taskSortASC)).toEqual(sortedTasks);
    });

    test('convertObjectToFormData', () => {

        const dummyObject = {
            id: 1,
            file: new File([''], 'profile_pic.png', { type: 'image/png', lastModified: new Date() })
        };

        const formData = utils.convertObjectToFormData(dummyObject);

        expect(parseInt(formData.get('id'))).toEqual(dummyObject.id);
        expect(formData.get('file').name).toEqual(dummyObject.file.name);
        expect(formData.get('file').type).toEqual(dummyObject.file.type);
        expect(formData.get('file').lastModified).toEqual(dummyObject.file.lastModified);
    });

    test('createControlsArray', () => {

        const controls = {
            username: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                className: 'form-control',
                name: 'username',
                icon: {
                    className: 'fa fa-user'
                }
            },
        };

        const controlsArray = [{
            id: 'username',
            config: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                className: 'form-control',
                name: 'username',
                icon: {
                    className: 'fa fa-user'
                }
            }
        }];
        expect(utils.createControlsArray(controls)).toEqual(controlsArray);
    });

    test('extractErrorMessages - array', () => {
        const errorMessages = ['Error message 1', 'Error message 2'];
        const props = {
            error: {
                data: {
                    field: errorMessages
                }
            }
        };
        expect(utils.extractErrorMessages(props, 'field')).toEqual(errorMessages);
    });

    test('extractErrorMessages - object', () => {
        const errorMessages = ['field1: message', 'field2: message'];
        const props = {
            error: {
                data: {
                    username: {
                        field1: 'message',
                        field2: 'message'
                    }
                }
            }
        };
        expect(utils.extractErrorMessages(props, 'username')).toEqual(errorMessages);
    });
});