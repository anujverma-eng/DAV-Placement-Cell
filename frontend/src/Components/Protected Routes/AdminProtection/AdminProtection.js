import React, { Fragment } from 'react';
import NotFound from '../../Layouts/Not Found/NotFound';
import Loader from '../../Layouts/Loader/Loader';
import LoginComponent from '../../User/LoginSignUp/LoginComponent';
import Sidebar from '../../Admin Components/Sidebar/Sidebar';

const AdminProtection = (props) => {
    if (props.isAuthenticated === undefined) {
        return (
            <Loader />
        );
    } else {
        if (props.isAuthenticated === true) {

            if (props.student.role === 'admin') {
                return (
                    <Fragment>
                        {!props.loading && (
                            <Sidebar element={props.element} />
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

export default AdminProtection;