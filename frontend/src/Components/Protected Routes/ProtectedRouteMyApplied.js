import React, { Fragment } from 'react';
import Loader from '../Layouts/Loader/Loader';
import MyApplied from '../User/MyApplied/MyApplied';
import LoginComponent from '../User/LoginSignUp/LoginComponent';

const ProtectedRouteMyApplied = ({ isAuthenticated, loading, student }) => {


    if (isAuthenticated === undefined) {
        return (
            <Loader />
        );
    } else {
        if (isAuthenticated === true) {
            return (
                <Fragment>
                    {!loading && (
                        <MyApplied />
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

export default ProtectedRouteMyApplied;