import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/verifyEmail';

const EmailVerification = (props) => {

    const { token } = useParams();

    useEffect(() => {
        props.onVerifyEmail(token);
    }, []);

    return (
        <div className="card bg-light mt-1">
            <article className="card-body">
                <h3 className="card-title">Email Confirmed</h3>
                <p className="card-text">Thank you, for your registration. <br />Your email now is confirmed. Please
                    proceed with <Link
                        to="/login">login</Link>.</p>
            </article>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.email.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onVerifyEmail: (token) => dispatch(actions.verifyEmailWithToken(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);