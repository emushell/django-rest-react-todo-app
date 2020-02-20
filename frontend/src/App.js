import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';

function App() {

    const routes = (
        <Switch>
            <Route exact path="/login" component={Login} />
        </Switch>
    );

    return (
        <Layout>
            <NavigationBar />
            {routes}
        </Layout>
    );
}

export default App;
