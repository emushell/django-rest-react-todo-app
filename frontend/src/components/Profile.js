import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/profile';
import { connect } from 'react-redux';
import Spinner from './Spinner/Spinner';
import classes from './Profile.module.css';

const Profile = (props) => {
    useEffect(() => {
        props.onFetchProfile();
    }, []);

    if (!props.profile || props.loading) {
        return <Spinner />;
    }

    return (
        <div className="row">
            <div className="col-md-3">
                <div className="card bg-light mt-1">
                    <div className="card-body">
                        <h4 style={{ 'textAlign': 'center' }}>Account Settings</h4>
                        <hr />
                        <img className={classes['profile-pic']} src={props.profile.profile_pic} />
                    </div>
                </div>
            </div>
            <div className="col-md-9">
                <div className="card bg-light mt-1">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4>{props.profile.first_name || ''}'s Profile</h4>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">First Name</label>
                                    <div className="input-group col-sm-6">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="fa fa-user" /> </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="First Name"
                                               defaultValue={props.profile.first_name || ''}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Last Name</label>
                                    <div className="input-group col-sm-6">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="fa fa-user" /> </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Last Name"
                                               defaultValue={props.profile.last_name || ''} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Email</label>
                                    <div className="input-group col-sm-6">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="fa fa-envelope" /> </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Email"
                                               defaultValue={props.profile.email || ''} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Phone</label>
                                    <div className="input-group col-sm-6">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="fa fa-phone" /> </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Phone"
                                               defaultValue={props.profile.phone || ''} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Profile Pic</label>
                                    <div className="input-group col-sm-9">
                                        profile pic...
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="offset-3 col-sm-2 pr-0">
                                        <button className="btn btn-outline-primary btn-sm">Save</button>
                                        <Link className="btn btn-outline-dark btn-sm ml-1" to="/"
                                              role="button">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        loading: state.profile.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfile: () => dispatch(actions.fetchProfile()),
        // onAddTask: (task) => dispatch(actions.addTask(task)),
        // onUpdateTask: (task) => dispatch(actions.updateTask(task)),
        // onDeleteTask: (taskId) => dispatch(actions.deleteTask(taskId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);