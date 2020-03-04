import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/tasks';
import Card from './Card';

const TaskUpdate = (props) => {

    const { taskId } = useParams();
    const task = props.tasks.find(task => task.id === parseInt(taskId));
    const [updatedTask, setUpdatedTask] = useState({
        submit: false,
        task: { ...task }
    });

    const handleUpdateTask = (event) => {
        let { name, value } = event.target;
        if (name === 'done') {
            value = event.target.checked;
        }
        setUpdatedTask({
            submit: updatedTask.submit,
            task: { ...updatedTask.task, [name]: value }
        });

    };

    const handleSubmitUpdate = (event) => {
        event.preventDefault();
        props.onUpdateTask(updatedTask.task);
        setUpdatedTask({
            ...updatedTask,
            submit: true
        });

    };

    if (!props.loading && updatedTask.submit) {
        return <Redirect to='/' />;
    }

    return (
        <Card>
            <div className="row justify-content-center mt-1 mb-5">
                <div className="col-5">
                    <h5>Update task</h5>
                    <div className="row">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" checked={updatedTask.task.done}
                                           name="done"
                                           onChange={handleUpdateTask} />
                                </div>
                            </div>
                            <input className="form-control form-control-sm" value={updatedTask.task.title}
                                   name="title"
                                   onChange={handleUpdateTask} />
                            <div className="input-group-append">
                                <button onClick={handleSubmitUpdate} className="btn btn-outline-primary btn-sm"
                                        value="id"
                                        name="update">Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
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
        onUpdateTask: (task) => dispatch(actions.updateTask(task))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskUpdate);