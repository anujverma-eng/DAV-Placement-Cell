import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Metadata from '../../Layouts/Metadata';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Moment from 'react-moment';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import { loadStudent, updateStudentPassword } from '../../../actions/studentAction';
import { UPDATE_PASSWORD_RESET } from '../../../constants/studentConstants';

const ProfileComponent = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAuthenticated, loading, student } = useSelector((state) => state.studentReducer);
    const { error, isUpdated } = useSelector((state) => state.updateStudentProfileReducer);

    //* UseEffect is for UpdatePassword.
    useEffect(() => {
        if (error) {
            alert.error(error);
        }
        if (isUpdated) {
            alert.success("Password Updated Successfully");
            dispatch(loadStudent());

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, alert, isUpdated, error]);


    //* On Open & passwords is for Update Password Dialog Box.
    const [open, setOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleFormData = (e) => {
        if (e.target.name === "newPassword") {
            setNewPassword(e.target.value);
        } else if (e.target.name === "oldPassword") {
            setOldPassword(e.target.value);
        } else {
            setConfirmPassword(e.target.value);
        }
    };

    const handleForgotBtn = () => {
        if (newPassword === confirmPassword && newPassword !== "") {
            setOpen(false);
            const myForm = new FormData();
            myForm.append("oldPassword", oldPassword);
            myForm.append("newPassword", newPassword);
            myForm.append("confirmPassword", confirmPassword);

            dispatch(updateStudentPassword(myForm));

        } else {
            alert.error("New Password and Confirm Password does not Match");
        }

    };


    return (
        <Fragment>
            <Metadata title="Profile" />
            {!loading && isAuthenticated &&
                <div className="container p-0 p-md-4">
                    <div className="shadow-lg" style={{ margin: 20 }}>
                        <div className="row justify-content-center align-items-center" style={{ padding: 10, margin: 0, background: '#303b51', color: 'rgb(255,255,255)' }}>
                            <div className="col-md-8 col-lg-7 col-xl-7 col-xxl-7">
                                <div>
                                    <h1 className="text-capitalize" style={{ letterSpacing: 2 }}>{`${student.firstName} ${student.lastName}`}</h1>
                                </div>
                                <div>
                                    <p className='text-break' >{student.objective}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 col-xxl-3 order-first order-md-last mb-md-0 mb-3">
                                <div className="text-center"><img className="img-fluid" src={student.avatar.url} alt="/Profile.png" style={{ marginBottom: 19, borderRadius: '100%' }} />
                                    <div><button className="btn btn-success" type="button"><i className="fa fa-edit" /><Link className="text-decoration-none" to='/profile/update' style={{ color: 'rgb(255,255,255)' }}>Edit Profile</Link></button></div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-center" style={{ color: 'rgb(255,255,255)', padding: 10, margin: 0, background: '#1d273b' }}>
                            <div className="col-md-6 col-lg-5 col-xl-5 col-xxl-5">
                                <div className="fs-6 d-flex gap-2 align-items-center" style={{ marginBottom: 5 }}><i className="fa fa-envelope" style={{ marginBottom: 5 }} /><span style={{ marginBottom: 5 }}>{student.email}</span></div>
                            </div>
                            <div className="col-md-6 col-lg-5 col-xl-5 col-xxl-5" style={{ marginBottom: 5 }}>
                                <div className="fs-6 d-flex gap-2 align-items-center" style={{ marginBottom: 5 }}><i className="fa fa-phone-square" style={{ marginBottom: 5 }} /><span style={{ marginBottom: 5 }}>{student.phone}</span></div>
                            </div>
                            <div className="col-md-6 col-lg-5 col-xl-5 col-xxl-5" style={{ marginBottom: 5 }}>
                                <div className="fs-6 d-flex gap-2 align-items-center" style={{ marginBottom: 5 }}><i className="fa fa-map-marker" style={{ marginBottom: 5 }} /><span style={{ marginBottom: 5 }}>{student.address}</span></div>
                            </div>
                            <div className="col-md-6 col-lg-5 col-xl-5 col-xxl-5" style={{ marginBottom: 5 }}>
                                <div className="fs-6 d-flex gap-2 align-items-center" style={{ marginBottom: 5 }}><i className="fa fa-calendar" style={{ marginBottom: 5 }} /><span style={{ marginBottom: 5 }}><Moment format='D MMM YYYY'>{student.dateOfBirth && student.dateOfBirth}</Moment></span></div>
                            </div>
                            <div className="col-md-6 col-lg-5 col-xl-5 col-xxl-5" style={{ marginBottom: 5 }}>
                                <div className="fs-6 d-flex gap-2 align-items-center" style={{ marginBottom: 5 }}><i className="fa fa-calendar" style={{ marginBottom: 5 }} /><span style={{ marginBottom: 5 }}>{student.classRollNo}</span></div>
                            </div>
                            <div className="col-md-6 col-lg-5 col-xl-5 col-xxl-5" style={{ marginBottom: 5 }}>
                                <div className="fs-6 d-flex gap-2 align-items-center" style={{ marginBottom: 5 }}><i className="fa fa-calendar" style={{ marginBottom: 5 }} /><span style={{ marginBottom: 5 }}>{student.universityRollno}</span></div>
                            </div>
                            <div className="col-md-6 col-lg-5 col-xl-5 col-xxl-5" style={{ marginBottom: 5 }}>
                                <div className="fs-6 d-flex gap-2 align-items-center" style={{ marginBottom: 5 }}><i className="fa fa-link" style={{ marginBottom: 5 }} /><a target={"_blank"} rel="noopener noreferrer" className="text-decoration-none" href={student.linkedInURL && student.linkedInURL} style={{ color: 'rgb(255,255,255)', marginBottom: 5 }}>{student.linkedInURL ? student.linkedInURL : "Not added"}</a></div>
                            </div>
                            <div className="col-md-6 col-lg-5 col-xl-5 col-xxl-5" style={{ marginBottom: 5 }}>
                                <div className="fs-6 d-flex gap-2 align-items-center" style={{ marginBottom: 5 }}><i className="fa fa-link" /><a target={"_blank"} rel="noopener noreferrer" className="text-decoration-none" href={student.socialLink && student.socialLink} style={{ color: 'rgb(255,255,255)' }}>{student.socialLink ? student.socialLink : "Not added"}</a></div>
                            </div>
                        </div>
                        <div className="row justify-content-center" style={{ margin: 0, padding: 10, background: 'var(--bs-gray-500)' }}>
                            <div className="col-xl-5" style={{ marginBottom: 5 }}>
                                <div>
                                    <div className="shadow-sm">
                                        <div style={{ padding: 10, background: '#1d273b', opacity: 1, borderRadius: 4, marginBottom: 2 }}>
                                            <h4 className="d-inline" style={{ textShadow: '1px 1px 1px rgb(61,61,61)', color: 'rgb(255,255,255)' }}><strong>Education</strong></h4>
                                        </div>
                                        <div style={{ background: '#303b51', color: 'rgb(255,255,255)', borderRadius: 4, marginBottom: 5 }}>
                                            <div className="d-flex align-items-center gap-2" style={{ padding: 10, paddingBottom: 0 }}><span className="text-uppercase"><strong>{student.classIn}</strong></span><span className="text-capitalize"><strong>{student.year}</strong></span></div>
                                            <div className="d-flex align-items-center gap-2" style={{ padding: 10, paddingBottom: 5 }}><span className="fs-6">Class 10:</span><span className="text-capitalize"><strong>{student.class10}</strong></span></div>
                                            <div className="d-flex align-items-center gap-2" style={{ padding: 10, paddingBottom: 5 }}><span className="fs-6">Class 12:</span><span className="text-capitalize"><strong>{student.class12}</strong></span></div>
                                            <div className="d-flex align-items-center gap-2" style={{ padding: 10, paddingBottom: 5 }}><span className="fs-6">Graduation:</span><span className="text-capitalize"><strong>{student.graduation}</strong></span></div>
                                        </div>
                                    </div>
                                    <div className="shadow-sm">
                                        <div style={{ padding: 10, background: '#1d273b', opacity: 1, borderRadius: 4, marginBottom: 2 }}>
                                            <h4 className="d-inline" style={{ textShadow: '1px 1px 1px rgb(61,61,61)', color: 'rgb(255,255,255)' }}><strong>Skills</strong><br /></h4>
                                        </div>
                                        <div style={{ background: '#303b51', color: 'rgb(255,255,255)', borderRadius: 4, marginBottom: 5 }}>
                                            <div className="d-flex align-items-center gap-2" style={{ padding: 10, paddingBottom: 0, marginBottom: 5 }}>
                                                <p className='text-break' >{student.skills}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shadow-sm">
                                        <div style={{ padding: 10, background: '#1d273b', opacity: 1, borderRadius: 4, marginBottom: 2 }}>
                                            <h4 className="d-inline" style={{ textShadow: '1px 1px 1px rgb(61,61,61)', color: 'rgb(255,255,255)' }}><strong>Projects</strong><br /></h4>
                                        </div>
                                        <div style={{ background: '#303b51', color: 'rgb(255,255,255)', borderRadius: 4 }}>
                                            <div className="d-flex align-items-center gap-2" style={{ padding: 10, paddingBottom: 0 }}>
                                                <p className='text-break' >{student.projects ? student.projects : "Not added"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5">
                                <div className="shadow-sm">
                                    <div style={{ padding: 10, background: '#303b51', opacity: 1, borderRadius: 4, marginBottom: 2 }}>
                                        <h4 className="d-inline" style={{ textShadow: '1px 1px 1px rgb(61,61,61)', color: 'rgb(255,255,255)' }}><strong>About Me</strong></h4>
                                    </div>
                                    <div style={{ background: '#1d273b', color: 'rgb(255,255,255)', borderRadius: 4, marginBottom: 5 }}>
                                        <div className="d-flex align-items-center gap-2" style={{ padding: 10, paddingBottom: 0 }}>
                                            <p className='text-break' >{student.experience ? student.about : "Fresher or not added"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="shadow-sm">
                                    <div style={{ padding: 10, background: '#303b51', opacity: 1, borderRadius: 4, marginBottom: 2 }}>
                                        <h4 className="d-inline" style={{ textShadow: '1px 1px 1px rgb(61,61,61)', color: 'rgb(255,255,255)' }}><strong>Work Experience</strong></h4>
                                    </div>
                                    <div style={{ background: '#1d273b', color: 'rgb(255,255,255)', borderRadius: 4, marginBottom: 5 }}>
                                        <div className="d-flex align-items-center gap-2" style={{ padding: 10, paddingBottom: 0 }}>
                                            <p className='text-break' >{student.experience ? student.experience : "Fresher or not added"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-center" style={{ color: 'rgb(255,255,255)', padding: 10, margin: 0, background: '#1d273b' }}>
                            <div className="col-md-6 col-lg-5 col-xl-5 col-xxl-5">
                                <div className="fs-6 d-flex gap-2 align-items-center" style={{ marginBottom: 5 }}><span style={{ marginBottom: 5 }}>Joined On: <Moment format='D MMM YYYY, hh:mm'>{student.createdAt && student.createdAt}</Moment></span></div>
                            </div>
                            <div className="col-md-6 col-lg-5 col-xl-5 col-xxl-5 d-flex gap-4" style={{ marginBottom: 5 }}>
                                <div style={{ marginBottom: 8 }}><button className="btn btn-danger" type="button" onClick={handleClickOpen}><i className="fa fa-edit" />Change Password</button></div>
                                <div style={{ marginBottom: 5 }}><Link to="/myApplied" className="btn btn-warning" type="button">My Applied</Link></div>
                            </div>
                        </div>
                    </div>

                    <Dialog open={open} onClose={handleClose} fullWidth>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Your Password will get changed.
                            </DialogContentText>
                            <div className="col text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="password"><strong>Old Password</strong><br /><span>*</span></label>
                                <input onChange={handleFormData} value={oldPassword} required className="shadow-sm form-control p-sm-2 p-md-1" type="password" placeholder="Old Password" name="oldPassword" title="Old Password" pattern="^[a-zA-Z0-9_.-]*$" minLength={8} maxLength={25} />
                            </div>
                            <div className="col text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="password"><strong>New Password</strong><br /><span>*</span></label>
                                <input onChange={handleFormData} value={newPassword} required className="shadow-sm form-control p-sm-2 p-md-1" type="password" placeholder="Create New Password" name="newPassword" title="New Password" pattern="^[a-zA-Z0-9_.-]*$" minLength={8} maxLength={25} />
                            </div>
                            <div className="col text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="password"><strong>Confirm New Password</strong><br /><span>*</span></label>
                                <input onChange={handleFormData} value={confirmPassword} required className="shadow-sm form-control p-sm-2 p-md-1" type="password" placeholder="Confirm Password" name="confirmPassword" title="Confirm Password" pattern="^[a-zA-Z0-9_.-]*$" minLength={8} maxLength={25} />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleForgotBtn}>Change Password</Button>
                        </DialogActions>
                    </Dialog>


                </div>
            }
        </Fragment>
    );
};

export default ProfileComponent;