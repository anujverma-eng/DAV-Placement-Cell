import React, { Fragment } from 'react';
import NotFound from '../../Layouts/Not Found/NotFound';
import Loader from '../../Layouts/Loader/Loader';
import LoginComponent from '../../User/LoginSignUp/LoginComponent';
import Dashboard from '../../Admin Components/Dashboard/Dashboard';

const AdminProtectedDashboard = ({ isAuthenticated, loading, student }) => {
    if (isAuthenticated === undefined) {
        return (
            <Loader />
        );
    } else {
        if (isAuthenticated === true) {

            if (student.role === 'admin') {
                return (
                    <Fragment>
                        {!loading && (
                            <Dashboard />
                        )}
                    </Fragment>
                );
            } else {
                return (
                    <NotFound />
                );
            }

        } else {
            return (
                <Fragment>
                    <LoginComponent />
                </Fragment>
            );
        }
    }
};

export default AdminProtectedDashboard;