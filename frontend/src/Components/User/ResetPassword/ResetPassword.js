import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../../Layouts/Loader/Loader';
import Metadata from '../../Layouts/Metadata';
import { clearErrors, resetPassword } from '../../../actions/studentAction';
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const height = window.innerHeight - 128;
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();

    const { loading, success, error } = useSelector((state) => state.forgotPasswordReducer);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");
            navigate("/login", { replace: true });
        }

    }, [dispatch, error, alert, success, navigate]);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleOnChange = (e) => {
        if (e.target.name === "password") {
            setPassword(e.target.value);
        } else {
            setConfirmPassword(e.target.value);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword && password !== "") {
            dispatch(resetPassword(params.token, password, confirmPassword));
        } else {
            alert.error("Password and Confirm Password did not match.");
        }
    };



    return (
        <Fragment>
            <Metadata title={"Forgot Password"} />
            {loading ? <Loader /> :
                <div>
                    <div className="container text-center">
                        <div className="row text-center justify-content-center align-items-center" style={{ height: `${height}px` }}>
                            <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5 col-xxl-4 align-self-center">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="shadow" style={{ padding: 35 }}>
                                        <h1 style={{ marginBottom: 40 }}>Change Password</h1>
                                        <div style={{ width: '100%', marginBottom: 40 }}>
                                            <div className="input-group shadow-sm"><span className="input-group-text"><i className="fa fa-eye" /></span>
                                                <input onChange={handleOnChange} value={password} className="form-control" type="password" name="password" placeholder="New Password" required minLength={5} maxLength={30} inputMode="email" style={{ borderRadius: 4 }} />
                                            </div>
                                        </div>
                                        <div style={{ width: '100%', marginBottom: 40 }}>
                                            <div className="input-group shadow-sm"><span className="input-group-text"><i className="fa fa-eye" /></span>
                                                <input onChange={handleOnChange} value={confirmPassword} className="form-control" type="password" name="confirmPassword" placeholder="Confirm New Password" required minLength={5} maxLength={30} inputMode="email" style={{ borderRadius: 4 }} />
                                            </div>
                                        </div><button className="btn btn-outline-success shadow-sm" type="submit" style={{ width: '100%' }}>Change Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            }

        </Fragment >
    );
};

export default ResetPassword;