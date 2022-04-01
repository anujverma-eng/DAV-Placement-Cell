import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Metadata from '../../Layouts/Metadata';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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

import Loader from '../../Layouts/Loader/Loader';
import { useAlert } from 'react-alert';
import { clearErrors, deleteJob, fewUpdatesInJob, getAdminJobs } from '../../../actions/jobAction';
import { ADMIN_DELETE_JOB_RESET } from '../../../constants/jobConstants';

const Dashboard = () => {

    const dispatch = useDispatch();
    const { loading, error, jobs, jobsCount } = useSelector((state) => state.adminJobReducer);
    const jobDeleteUpdateReducer = useSelector((state) => state.adminDeleteUpdateJobReducer);

    const alert = useAlert();
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [jobId, setJobId] = useState(false);
    const [status, setStatus] = useState("Approved");
    const [lastDateToApply, setLastDateToApply] = useState("");
    const [whatsappLink, setWhatsappLink] = useState("");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (jobDeleteUpdateReducer.error) {
            alert.error(jobDeleteUpdateReducer.error);
            dispatch(clearErrors());
        }
        jobDeleteUpdateReducer.isUpdated && alert.success("Successfully Updated");
        jobDeleteUpdateReducer.isDeleted && alert.success("Deleted Successfully");
        dispatch(getAdminJobs("Approved", false));
    }, [dispatch, error, alert, jobDeleteUpdateReducer.error, jobDeleteUpdateReducer.isDeleted, jobDeleteUpdateReducer.isUpdated]);


    const handleDelete = (id) => {
        setOpen(true);
        setJobId(id);

    };

    const handleClose = () => {
        setOpen(false);
        setEditOpen(false);
    };

    const handleDeleteYES = () => {
        setOpen(false);
        if (jobId) {
            dispatch(deleteJob(jobId));
        }
    };

    const statusSelected = (e) => {
        setStatus(e.target.value);
    };
    const lastDateSelected = (e) => {
        setLastDateToApply(e.target.value);
    };
    const whatsAppLinkSelected = (e) => {
        setWhatsappLink(e.target.value);
    };
    const handleEdit = (id, whatsAppLinkGP, lastDateToApplyElement) => {
        setEditOpen(true);
        setJobId(id);
        setWhatsappLink(whatsAppLinkGP);
        lastDateToApplyElement && setLastDateToApply(new Date(lastDateToApplyElement).toISOString().slice(0, 10));
    };

    const handleUpdateDialog = () => {
        setEditOpen(false);
        if (jobId) {
            dispatch(fewUpdatesInJob(jobId, status, lastDateToApply, whatsappLink));
        }
    };



    return (
        <Fragment>
            <Metadata title="Admin Dashboard" />
            {loading ? <Loader /> :
                <div>
                    <div className="row">
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-primary py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span>Live jobs</span></div>
                                            <div className="text-dark fw-bold h5 mb-0"><span>{jobs && jobs.length}</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-broadcast-tower fa-2x text-gray-300" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-success py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-success fw-bold text-xs mb-1"><span>Total students</span></div>
                                            <div className="text-dark fw-bold h5 mb-0"><span>1156</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-user-graduate fa-2x text-gray-300" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-info py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-info fw-bold text-xs mb-1"><span>Total applied</span></div>
                                            <div className="text-dark fw-bold h5 mb-0 me-3"><span>1089</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-diagnoses fa-2x text-gray-300" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-warning py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-warning fw-bold text-xs mb-1"><span>Pending approvals</span></div>
                                            <div className="text-dark fw-bold h5 mb-0"><span>{(jobsCount - jobs.length).toString()}</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-stopwatch fa-2x text-gray-300" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="content">
                        <div className="container-fluid">
                            {jobs ?
                                jobs.map((element, idx) =>
                                (<div className="row align-items-center bg-light" style={{ boxShadow: '1.2px 1px 2px 1px rgb(187,187,190)', marginBottom: 18 }} key={idx}>
                                    <div className="col">
                                        <div className="d-inline"><i className="fa fa-circle text-center text-success" style={{ fontSize: 10, padding: 2 }} /><label className="form-label text-danger" style={{ margin: 0 }}>Live</label></div>
                                        <div className="row">
                                            <div className="col-lg-6 col-xl-5" style={{ paddingBottom: 5 }}>
                                                <h3 className="text-primary"><strong>{element.companyName}</strong></h3>
                                                <h5 className="text-dark"><strong>{element.jobRole}</strong></h5>
                                                <div><label className="form-label">Contact Person</label><span style={{ marginLeft: 8 }}><strong>{element.companyContactPerson}</strong></span></div>
                                                <div><label className="form-label">Company Email</label><span style={{ marginLeft: 8 }}><strong>{element.companyEmail}</strong></span></div>
                                                <div><label className="form-label">Company Contact</label><span style={{ marginLeft: 8 }}><strong>{element.contactPersonPhone}</strong></span></div>
                                                <div><label className="form-label">Company Address</label><span style={{ marginLeft: 8 }}><strong>{element.companyAddress}</strong></span></div>
                                                <hr className="d-block d-md-none" />
                                            </div>
                                            <div className="col-md-8 col-lg-6 col-xl-4 col-xxl-4" style={{ paddingBottom: 5 }}>
                                                <div><label className="form-label">Candidates Required</label><span style={{ marginLeft: 8 }}><strong>{element.candidatesRequired}</strong></span></div>
                                                <div><label className="form-label">Class Required</label><span style={{ marginLeft: 8 }}><strong>{element.class && element.class.map((elem) => (`${elem}, `))}</strong></span></div>
                                                <div><label className="form-label">Class Year</label><span style={{ marginLeft: 8 }}><strong>{element.eligibility && element.eligibility.map((elem) => (`${elem}, `))}</strong></span></div>
                                                <div><label className="form-label">Job Type</label><span style={{ marginLeft: 8 }}><strong>{element.jobType && element.jobType.map((elem) => (`${elem}, `))}</strong></span></div>
                                                <div><label className="form-label">Salary Per Month</label><span style={{ marginLeft: 8 }}><strong>{Number(element.salaryPM)}</strong></span></div>
                                                <div><label className="form-label">Last Date to apply</label><span style={{ marginLeft: 8 }}><strong><Moment format='D MMM YYYY, hh:mm'>{element.lastDateToApply && element.lastDateToApply}</Moment></strong></span></div>
                                                <hr className="d-block d-md-none" />
                                            </div>
                                            <div className="col-md-4 col-xl-3 col-xxl-3" style={{ paddingBottom: 5 }}>
                                                <div><label className="form-label">Created At</label><span style={{ marginLeft: 8 }}><br /><strong><Moment format='D MMM YYYY, hh:mm'>{element.createdAt && element.createdAt}</Moment></strong></span></div>
                                                <div><label className="form-label">ID</label><span style={{ marginLeft: 8 }}><br /><strong>{element._id}</strong></span></div>
                                                <div className="text-success"><label className="form-label">Selected</label><span className="text-danger" style={{ marginLeft: 8 }}><strong>8</strong></span></div>
                                                <div className="d-flex gap-3">
                                                    <button onClick={(e) => handleDelete(element._id)} className="btn btn-danger" type="button"><DeleteForeverIcon /></button>
                                                    <button onClick={(e) => handleEdit(element._id, element.whatsappLink, element.lastDateToApply)} className="btn btn-primary" type="button"><EditIcon /></button>
                                                </div>
                                                <hr className="d-block d-md-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                                )
                                :
                                <div className="l">No Jobs Found</div>
                            }
                        </div>
                    </div>

                    <Dialog open={open} onClose={handleClose} fullWidth>
                        <DialogTitle>Delete Job</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this job ?
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
                                    <MenuItem value={"Approved"}>Approved</MenuItem>
                                    <MenuItem value={"Rejected"}>Rejected</MenuItem>

                                </Select>
                                <div className="col-11 col-sm-3 col-md-4 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0"><label className="form-label p-sm-2 p-md-1 m-1" htmlFor="lastDateToApply"><strong>Last Date to Apply</strong><br /></label>
                                    <input onChange={lastDateSelected} value={lastDateToApply} placeholder="Last Date" className="form-control p-sm-2 p-md-1" name="lastDateToApply" type="date" />
                                </div>
                                <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0"><label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="companyWebsite"><strong>Whatsapp Group</strong><br /></label>
                                    <input className="shadow-sm form-control p-sm-2 p-md-1" type="url" placeholder="Whatsapp Link Update" onChange={whatsAppLinkSelected} value={whatsappLink} name="whatsappLink" required inputMode="url" title="Whatsapp Group Link" />
                                </div>
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

export default Dashboard;