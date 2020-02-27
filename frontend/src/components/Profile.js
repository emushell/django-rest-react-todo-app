import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/profile';
import { connect } from 'react-redux';
import Spinner from './Spinner/Spinner';
import classes from './Profile.module.css';
import { Input } from './Input';

const Profile = (props) => {

    const [newProfile, setNewProfile] = useState({});
    useEffect(() => {
        props.onFetchProfile();
    }, []);

    const controls = {
        firstName: {
            elementConfig: {
                type: 'text',
                placeholder: 'First Name'
            },
            value: '',
            className: 'form-control',
            name: 'first_name',
            icon: {
                className: 'fa fa-user'
            },
            label: 'First Name'

        },
        lastName: {
            elementConfig: {
                type: 'text',
                placeholder: 'Last Name'
            },
            value: '',
            className: 'form-control',
            name: 'last_name',
            icon: {
                className: 'fa fa-user'
            },
            label: 'Last Name'

        },
        email: {
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            className: 'form-control',
            name: 'email',
            icon: {
                className: 'fa fa-envelope'
            },
            label: 'Email'

        },
        phone: {
            elementConfig: {
                type: 'text',
                placeholder: 'Phone'
            },
            value: '',
            className: 'form-control',
            name: 'phone',
            icon: {
                className: 'fa fa-phone'
            },
            label: 'Phone'

        },
        profilePic: {
            elementConfig: {
                type: 'file',
            },
            className: 'custom-file-input',
            name: 'profile_pic',
            label: 'Profile Pic',
            fileInputLabel: {
                value: 'Choose file',
                className: 'custom-file-label form-control'
            }
        },
    };

    const handleChange = (event) => {
        let { name, value } = event.target;

        if (name === 'profile_pic') {
            value = event.target.files[0];
        }
        setNewProfile({
            ...newProfile,
            [name]: value
        });
        console.log(name, value, newProfile);
    };

    const handleSaveProfile = (event) => {
        props.onPutUpdatedProfile({
            ...newProfile,
            id: props.profile.id
        });
    };

    if (props.loading) {
        return <Spinner />;
    }

    const controlsArray = Object.keys(controls).map(key => {
        controls[key].value = props.profile[controls[key].name];
        return { id: key, config: controls[key] };
    });

    const form = controlsArray.map((formElement, index) => {
        return (
            <div key={formElement.id} className="form-group row">
                <label className="col-sm-3 col-form-label">{formElement.config.label}</label>
                <div className="input-group col-sm-6">
                    {formElement.config.elementConfig.type === 'file' || (
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i
                                className={formElement.config.icon.className} /> </span>
                        </div>
                    )}
                    <Input className={formElement.config.className}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           name={formElement.config.name}
                           onChange={handleChange}
                           fileInputLabel={formElement.config.fileInputLabel}
                    />
                </div>
            </div>

        );
    });

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
                                {form}
                                <div className="form-group row">
                                    <div className="offset-3 col-sm-2 pr-0">
                                        <button onClick={handleSaveProfile}
                                                className="btn btn-outline-primary btn-sm">Save
                                        </button>
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
        onPutUpdatedProfile: (profile) => dispatch(actions.updateProfile(profile))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);