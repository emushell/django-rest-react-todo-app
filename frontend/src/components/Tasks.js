import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';

import * as actions from '../store/actions/tasks';
import { taskSortASC } from '../store/utils';
import Card from './Card';

const Tasks = (props) => {
    useEffect(() => {
        props.onFetchTasks();
    }, []);

    const [newTask, setNewTask] = useState({ title: null });

    const handleUpdateDone = (taskId) => {
        let { id, title, done } = props.tasks.find(task => task.id === taskId);
        props.onUpdateTask({ id, title, done: !done });
    };

    const handleOnClick = (event) => {
        const { value } = event.target;
        const taskId = parseInt(value);
        const path = `/update-task/${taskId}`;
        props.history.push(path);
    };

    const handleDelete = (event) => {
        event.preventDefault();
        const taskId = parseInt(event.target.value);
        props.onDeleteTask(taskId);
    };

    const handleAddNewTask = (event) => {
        event.preventDefault();
        props.onAddTask(newTask);
        setNewTask({ title: null });
    };

    const handleNewTask = (event) => {
        event.preventDefault();
        const title = event.target.value;
        setNewTask({ title });
    };

    let tasks = null;
    if (!props.loading || props.tasks) {
        tasks = props.tasks.sort(taskSortASC).map((task) => {
            return (
                <li key={task.id} className="list-group-item">
                    <div className="row">
                        <div className="col-sm-9">
                            <input className="mr-1" type="checkbox" checked={task.done}
                                   onChange={() => handleUpdateDone(task.id)} />
                            {task.title}
                            <button name="edit" value={task.id}
                                    onClick={handleOnClick}
                                    className="btn btn-outline-primary btn-sm mx-1">Edit
                            </button>
                            <button name="delete" value={task.id} onClick={handleDelete}
                                    className="btn btn-outline-dark btn-sm">Delete
                            </button>
                        </div>
                    </div>
                </li>
            );
        });
    }
    return (
        <LoadingOverlay
            active={props.loading}
            spinner
            text='Loading tasks...'
        >
            <Card>
                <div className="row justify-content-center my-1">
                    <div className="col-5">
                        <input onChange={handleNewTask} value={newTask.title || ''}
                               className="form-control form-control-sm"
                               type="text"
                               placeholder="Enter new task..." />
                        <button onClick={handleAddNewTask} className="btn btn-outline-primary btn-sm btn-block mt-1"
                                name="add">Add
                        </button>
                        <div className="card mt-1">
                            <ul className="list-group list-group-flush">
                                {tasks}
                            </ul>
                        </div>
                    </div>
                </div>
            </Card>
        </LoadingOverlay>
    );
};

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
        loading: state.tasks.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTasks: () => dispatch(actions.fetchTasks()),
        onAddTask: (task) => dispatch(actions.addTask(task)),
        onUpdateTask: (task) => dispatch(actions.updateTask(task)),
        onDeleteTask: (taskId) => dispatch(actions.deleteTask(taskId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);