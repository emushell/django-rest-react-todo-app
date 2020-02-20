import React from 'react';
import { connect } from 'react-redux';

const NavigationBar = (props) => {

    const userLinks = (
        <ul className="nav navbar-nav ml-auto">
            <li className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Hello, {props.userId}</a>
                <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Edit</a>
                    <a className="dropdown-item" href="#">Logout</a>
                </div>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Todo's App</a>
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

