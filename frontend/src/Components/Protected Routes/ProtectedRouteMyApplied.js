import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import MyApplied from '../User/MyApplied/MyApplied';

const ProtectedRouteMyApplied = ({ isAuthenticated, loading, student }) => {

    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [navigate, isAuthenticated]);

    return (
        <Fragment>
            {!loading && (
                <MyApplied />
            )}
        </Fragment>
    );
};

export default ProtectedRouteMyApplied;