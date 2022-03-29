import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, forgotPassword } from '../../../actions/studentAction';
import Loader from '../../Layouts/Loader/Loader';
import Metadata from '../../Layouts/Metadata';

const UpdatePassword = () => {
    const height = window.innerHeight - 128;
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, message } = useSelector((state) => state.forgotPasswordReducer);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }

    }, [dispatch, error, alert, message]);

    const [email, setEmail] = useState("");


    const handleOnChange = (e) => {
        setEmail(e.target.value);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));

    };

    return (
        <Fragment>
            <Metadata title={"Forgot Password"} />
            {loading ? <Loader /> :
                <div>
                    <div className="container text-center">
                        <div className="row text-center justify-content-center align-items-center" style={{ height: `${height}px` }}>
                            <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5 col-xxl-4 align-self-center">
                                <form onSubmit={sendEmail}>
                                    <div className="shadow tada animated" style={{ padding: "100px 35px" }}>
                                        <h1 style={{ marginBottom: 40 }}>Forgot Password</h1>
                                        <div style={{ width: '100%', marginBottom: 40 }}>
                                            <div className="input-group shadow-sm"><span className="input-group-text"><i className="fa fa-envelope" /></span>
                                                <input required onChange={handleOnChange} value={email} className="form-control" type="email" name="email" placeholder="Email" minLength={5} maxLength={30} inputMode="email" style={{ borderRadius: 4 }} />
                                            </div>
                                        </div><button className="btn btn-outline-success shadow-sm" type="submit" style={{ width: '100%' }}>Send Reset Password Link</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </Fragment>
    );
};

export default UpdatePassword;

