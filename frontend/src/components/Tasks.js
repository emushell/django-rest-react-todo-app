import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/tasks';

const Tasks = (props) => {
    useEffect(() => {
        props.onFetchTasks();
    }, []);

    const handleUpdateDone = (taskId) => {
        props.onUpdateDone(taskId);
    };

    let tasks = [];
    if (!props.loading) {
        tasks = props.tasks.sort((task1, task2) => {
            return task1.id - task2.id;
        }).map((task) => {
            console.log(task);
            return (
                <li key={task.id} className="list-group-item">
                    <div className="row">
                        <div className="col-sm-9">
                            <input className="mr-1" type="checkbox" checked={task.done} onChange={() => handleUpdateDone(task.id)} />
                            {task.title}
                            <button className="btn btn-outline-primary btn-sm mx-1">Edit</button>
                            <button className="btn btn-outline-dark btn-sm">Delete</button>
                        </div>
                    </div>
                </li>
            );
        });
    }
    return (
        <div className="row justify-content-center">
            <div className="col-5 mt-1">
                <input className="form-control form-control-sm" type="text" placeholder="Enter new task..." />
                <button className="btn btn-outline-primary btn-sm btn-block mt-1" name="add">Add</button>
                <div className="card mt-1">
                    <ul className="list-group list-group-flush">
                        {tasks}
                    </ul>
                </div>
            </div>
        </div>
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
        onUpdateDone: (taskId) => dispatch(actions.tasksUpdateDone(taskId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);