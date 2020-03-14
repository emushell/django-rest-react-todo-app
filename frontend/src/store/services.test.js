import mockAxios from 'jest-mock-axios';
import * as services from './services';

import * as urls from './urls';

describe('testing services', () => {

    afterEach(() => {
        mockAxios.reset();
    });

    test('get all tasks', () => {
        let catchFn = jest.fn();
        let thenFn = jest.fn();

        services.getAllTasks()
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.get).toHaveBeenCalledWith(urls.TASKS_URL);

        // simulating a server response
        let task = { id: 1, title: 'Task' };
        let responseObj = { data: [task] };

        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith([task]);
        expect(catchFn).not.toHaveBeenCalled();
    });
});