import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar';
import Login from './components/Login';
import Logout from './components/Logout';
import Tasks from './components/Tasks';
import * as actions from './store/actions/auth';

function App(props) {

    useEffect(() => {
        props.onCheckLoginState();
    }, []);

    let routes = (
        <Switch>
            <Route path="/login" component={Login} />
            <Redirect to={'/login'} />
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route exact path={'/'} component={Tasks} />
                <Route path={'/logout'} component={Logout} />
                <Redirect to={'/'} />
            </Switch>
        );
    }

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
        onCheckLoginState: () => dispatch(actions.authCheckLoginState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
