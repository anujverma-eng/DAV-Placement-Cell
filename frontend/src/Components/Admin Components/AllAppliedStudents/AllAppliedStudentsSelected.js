import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteJobApplied, getAllAppliedAdmin, updateJobApplied } from '../../../actions/appliedAction';
import Loader from '../../Layouts/Loader/Loader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { ADMIN_DELETE_APPLIED_RESET } from '../../../constants/jobAppliedConstants';

const AllAppliedStudentsSelected = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, jobApplied } = useSelector((state) => state.adminAllAppliedReducer);
    const adminDeleteUpdateJobAppliedReducer = useSelector((state) => state.adminDeleteUpdateJobAppliedReducer);

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [jobAppliedId, setJobAppliedId] = useState(false);
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (adminDeleteUpdateJobAppliedReducer.error) {
            alert.error(adminDeleteUpdateJobAppliedReducer.error);
            dispatch(clearErrors());
        }
        adminDeleteUpdateJobAppliedReducer.isUpdated && alert.success("Successfully Updated");
        adminDeleteUpdateJobAppliedReducer.isDeleted && alert.success("Deleted Successfully");
        dispatch({ type: ADMIN_DELETE_APPLIED_RESET });
        dispatch(getAllAppliedAdmin("Selected"));
    }, [dispatch, error, alert, adminDeleteUpdateJobAppliedReducer.error, adminDeleteUpdateJobAppliedReducer.isUpdated, adminDeleteUpdateJobAppliedReducer.isDeleted]);


    const handleDelete = (id) => {
        setOpen(true);
        setJobAppliedId(id);

    };

    const handleClose = () => {
        setOpen(false);
        setEditOpen(false);
    };

    const handleDeleteYES = () => {
        setOpen(false);
        if (jobAppliedId) {
            dispatch(deleteJobApplied(jobAppliedId));
        }
    };

    const statusSelected = (e) => {
        setStatus(e.target.value);
    };

    const handleEdit = (id, interviewStatusParam) => {
        setEditOpen(true);
        setJobAppliedId(id);
        setStatus(interviewStatusParam);
    };

    const handleUpdateDialog = () => {
        setEditOpen(false);
        if (jobAppliedId) {
            dispatch(updateJobApplied(jobAppliedId, status));
        }
    };



    return (
        <Fragment>
            {loading ? <Loader /> :
                <div>
                    <div className="content">
                        <div className="container-fluid">
                            {(jobApplied && jobApplied.length !== 0) ?
                                jobApplied.map((element, idx) => (
                                    <div className="row align-items-center" style={{ boxShadow: '1.2px 1px 2px 1px rgb(187,187,190)', marginBottom: 18 }} key={idx}>
                                        <div className="col">
                                            <div className="d-inline"><i className="fa fa-circle text-center text-success" style={{ fontSize: 10, padding: 2 }} /><label className="form-label text-danger" style={{ margin: 0 }}>{element.interviewStatus}</label></div>
                                            <div className="row">
                                                <div className="col-lg-7 col-xl-6 col-xxl-5" style={{ paddingBottom: 5 }}>
                                                    <div className="row justify-content-center align-items-center">
                                                        <div className="col align-self-center"><img className="img-fluid" src={element && element.student && element.student.avatar && element.student.avatar.url && element.student.avatar.url} alt="Profile" style={{ height: 180, width: 'auto' }} /></div>
                                                        <div className="col">
                                                            <div><span className="text-capitalize text-primary"><strong>{`${element.student.firstName} ${element.student.lastName}`}</strong></span></div>
                                                            <div><span className="text-capitalize text-dark"><strong>{`${element.student.classIn}, ${element.student.year}`}</strong></span></div>
                                                            <div><span><strong>{element.student.phone}</strong></span></div>
                                                            <div><span><strong>{element.student.email}</strong></span></div>
                                                            <div><span><strong>{element.student.class10}</strong></span><label className="form-label" style={{ marginLeft: 5, marginBottom: 0 }}>in Class 10th</label></div>
                                                            <div><span><strong>{element.student.class12}</strong></span><label className="form-label" style={{ marginLeft: 5, marginBottom: 0 }}>in Class 12th</label></div>
                                                            <div><span><strong>{element.student.graduation}</strong></span><label className="form-label" style={{ marginLeft: 5, marginBottom: 0 }}>in Graduation</label></div>
                                                        </div>
                                                    </div>
                                                    <hr className="d-block d-md-none" />
                                                </div>
                                                <div className="col-md-6 col-lg-5 col-xl-3 col-xxl-3" style={{ paddingBottom: 5 }}>
                                                    <div><label className="form-label">Applied In</label><span className="text-info" style={{ marginLeft: 8 }}><strong>{element.appliedJobs[0].job && element.appliedJobs[0].job.companyName}</strong></span></div>
                                                    <div><label className="form-label">Profile</label><span className="text-dark" style={{ marginLeft: 8 }}><strong>{element.appliedJobs[0].job && element.appliedJobs[0].job.jobRole}</strong></span></div>
                                                    <div><label className="form-label">Job Type</label><span className="text-success" style={{ marginLeft: 8 }}><strong>{element.appliedJobs[0].job && element.appliedJobs[0].job.jobType}</strong></span></div>
                                                    <div><label className="form-label">Salary / Stipend</label><span style={{ marginLeft: 8 }}><strong>{element.appliedJobs[0].job && element.appliedJobs[0].job.salaryPM}</strong></span></div>
                                                    <div><label className="form-label">Last Date to apply</label><span style={{ marginLeft: 8 }}><strong><Moment format='DD MMM YYYY, hh:mm'>{element.appliedJobs[0].job && element.appliedJobs[0].job.lastDateToApply}</Moment></strong></span></div>
                                                    <div className="d-flex gap-3"><Link to={`/job/${element.appliedJobs[0].job && element.appliedJobs[0].job._id}`} className="btn btn-dark btn-sm" role="button">Job Details</Link><Link to={`/admin/student/${element.student._id}`} className="btn btn-info btn-sm" role="button">Student Profile</Link></div>
                                                    <hr className="d-block d-md-none" />
                                                </div>
                                                <div className="col-md-6 col-xl-3 col-xxl-4" style={{ paddingBottom: 5 }}>
                                                    <div><label className="form-label">Applied on</label><span style={{ marginLeft: 8 }}><strong><Moment format='DD MMM YYYY, hh:mm'></Moment></strong></span></div>
                                                    <div><label className="form-label">Student Id</label><span style={{ marginLeft: 8 }}><strong>{element.student._id}</strong></span></div>
                                                    <div><label className="form-label">Job Id</label><span style={{ marginLeft: 8 }}><strong>{element.appliedJobs[0].job && element.appliedJobs[0].job._id}</strong></span></div>
                                                    <div><label className="form-label">Applied Id</label><span style={{ marginLeft: 8 }}><strong>{element._id}</strong></span></div>
                                                    <div className="text-success"><label className="form-label">Status</label><span className="text-danger" style={{ marginLeft: 8 }}><strong>{element.interviewStatus}</strong></span></div>
                                                    <div className="d-flex gap-3">
                                                        <button onClick={(e) => handleDelete(element._id)} className="btn btn-danger btn-sm" type="button"><DeleteForeverIcon /></button>
                                                        <button onClick={(e) => handleEdit(element._id, element.interviewStatus)} className="btn btn-primary btn-sm" type="button"><EditIcon /></button>
                                                    </div>
                                                    <hr className="d-block d-md-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))

                                :
                                <div className="notFound">No Job Applied Found</div>
                            }
                        </div>
                    </div>
                    <Dialog open={open} onClose={handleClose} fullWidth>
                        <DialogTitle>Delete Job</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this Applied ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>No</Button>
                            <Button onClick={handleDeleteYES}>Yes</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={editOpen} onClose={handleClose} fullWidth>
                        <DialogTitle>Update Job</DialogTitle>
                        <DialogContent>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={statusSelected}
                                >
                                    <MenuItem value={"Pending"}>Pending</MenuItem>
                                    <MenuItem value={"Not Selected"}>Not Selected</MenuItem>
                                    <MenuItem value={"Selected"}>Selected</MenuItem>

                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                            <Button onClick={handleUpdateDialog}>Update</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
        </Fragment >
    );
};

export default AllAppliedStudentsSelected;