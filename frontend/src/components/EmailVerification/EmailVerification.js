import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { verifyEmail } from '../../store/services';
import { Link } from 'react-router-dom';

const EmailVerification = () => {

    const { token } = useParams();

    useEffect(() => {
        verifyEmail(token)
            .then(response => {
                // console.log(response);
            })
            .catch(
                error => {
                    // console.log(error.data);
                }
            );
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

export default EmailVerification;