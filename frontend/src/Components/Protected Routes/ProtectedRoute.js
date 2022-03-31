import React, { Fragment } from 'react';
import Loader from '../Layouts/Loader/Loader';
import LoginComponent from '../User/LoginSignUp/LoginComponent';

const ProtectedRoute = (props) => {

    if (props.isAuthenticated === undefined) {
        return (
            <Loader />
        );
    } else {
        if (props.isAuthenticated === true) {
            return (
                <Fragment>
                    {!props.loading && (
                        props.element
                    )}
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <LoginComponent />
                </Fragment>
            );
        }
    }


};

export default ProtectedRoute;