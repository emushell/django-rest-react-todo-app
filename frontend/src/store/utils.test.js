import * as utils from './utils';

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
});