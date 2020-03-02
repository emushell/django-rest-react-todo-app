import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const Logout = (props) => {

    useEffect(() => {
        props.onLogout();
    }, []);

    return (
        <Redirect to={'/login'} />
    );

};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);