import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {

    const userLinks = (
        <ul className="nav navbar-nav ml-auto">
            <li className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Hello, {props.userId}</a>
                <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Edit</a>
                    <Link to={'logout'} className="dropdown-item">Logout</Link>
                </div>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Todo's App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            {props.isAuthenticated ? userLinks : null}
        </nav>
    );
};


const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        isAuthenticated: state.auth.authenticated
    };
};

export default connect(mapStateToProps)(NavigationBar);

