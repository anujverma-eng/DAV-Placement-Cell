import React, { Fragment } from 'react';
import Loader from '../Layouts/Loader/Loader';
import LoginComponent from '../User/LoginSignUp/LoginComponent';
import ProfileComponent from '../User/ProfileComponent/ProfileComponent';

const ProtectedRoute = ({ isAuthenticated, loading, student }) => {

    if (isAuthenticated === undefined) {
        return (
            <Loader />
        );
    } else {
        if (isAuthenticated === true) {
            return (
                <Fragment>
                    {!loading && (
                        <ProfileComponent isAuthenticated={isAuthenticated} loading={loading} student={student} />
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