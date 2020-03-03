import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar';
import Registration from './components/Registration';
import EmailVerification from './components/EmailVerification';
import Login from './components/Login';
import Logout from './components/Logout';
import Tasks from './components/Tasks';
import TaskUpdate from './components/TaskUpdate';
import Profile from './components/Profile';
import * as actions from './store/actions/auth';

// TODO: fix all loading overlays, example: profile page
// TODO: display error messages
// TODO: create tests

const PublicRoute = ({ isAuthenticated, ...props }) => {
    return (
        !isAuthenticated
            ? <Route {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />);
};

const PrivateRoute = ({ isAuthenticated, ...props }) => {
    return (
        isAuthenticated
            ? <Route {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />);
};

function App(props) {

    useEffect(() => {
        props.onCheckLoginState();

        // This is needed in order if the path for the page is manually typed or
        // the page is fully refreshed. So the redirect routes work as needed.
        let { location } = props;
        let { from } = { from: { pathname: location.pathname } };
        props.history.replace(from);
    }, []);

    let routes = (
        <Switch>
            <PublicRoute isAuthenticated={props.isAuthenticated} path="/login" component={Login} />
            <PublicRoute isAuthenticated={props.isAuthenticated} path="/register" component={Registration} />
            <PublicRoute isAuthenticated={props.isAuthenticated} path="/email-verification/:token"
                         component={EmailVerification} />
            <PrivateRoute isAuthenticated={props.isAuthenticated} path="/update-task/:taskId" component={TaskUpdate} />
            <PrivateRoute isAuthenticated={props.isAuthenticated} path="/profile" component={Profile} />
            <PrivateRoute isAuthenticated={props.isAuthenticated} path="/logout" component={Logout} />
            <PrivateRoute isAuthenticated={props.isAuthenticated} path="/" component={Tasks} />
        </Switch>
    );

    return (
        <Layout>
            <NavigationBar />
            {routes}
        </Layout>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.authenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckLoginState: (history) => dispatch(actions.authCheckLoginState(history))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
