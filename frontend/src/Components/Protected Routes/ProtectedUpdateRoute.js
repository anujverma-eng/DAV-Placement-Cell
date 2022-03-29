import React, { Fragment } from 'react';
import Loader from '../Layouts/Loader/Loader';
import LoginComponent from '../User/LoginSignUp/LoginComponent';
import UpdateProfileComponent from '../User/ProfileComponent/UpdateProfileComponent';

const ProtectedUpdateRoute = ({ isAuthenticated, loading, student }) => {

    if (isAuthenticated === undefined) {
        return (
            <Loader />
        );
    } else {
        if (isAuthenticated === true) {
            return (
                <Fragment>
                    <UpdateProfileComponent />
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

export default ProtectedUpdateRoute;