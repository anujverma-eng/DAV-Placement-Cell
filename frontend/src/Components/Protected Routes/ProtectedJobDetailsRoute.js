import React, { Fragment } from 'react';
import JobDetailsComponent from '../Jobs/JobDetails/jobDetailsComponent';
import Loader from '../Layouts/Loader/Loader';
import LoginComponent from '../User/LoginSignUp/LoginComponent';

const ProtectedJobDetailsRoute = ({ isAuthenticated, loading, student }) => {

    if (isAuthenticated === undefined) {
        return (
            <Loader />
        );
    } else {
        if (isAuthenticated === true) {
            return (
                <Fragment>
                    <JobDetailsComponent />
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

export default ProtectedJobDetailsRoute;