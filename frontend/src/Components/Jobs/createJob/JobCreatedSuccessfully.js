import React, { Fragment, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getJobDetails } from '../../../actions/jobAction';
import { useAlert } from 'react-alert';
import Loader from '../../Layouts/Loader/Loader';
import Moment from 'react-moment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const JobCreatedSuccessfully = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const { loading, error, job } = useSelector((state) => state.jobDetailsReducer);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
            navigate('/not/found', { replace: true });
        }
        dispatch(getJobDetails(params.id));
    }, [dispatch, params.id, alert, error, navigate]);





    return (
        <Fragment>
            {loading ? <Loader /> :
                job && (<div id="content">
                    <div className="container-fluid" style={{ marginTop: 50 }}>
                        <div className="row">
                            <div className="col-xxl-12">
                                <h1 className="text-center">You Have Successfully Posted the Job !!</h1>
                            </div>
                            <div className="col">
                                <h5 className="text-center text-secondary">Once Your Job gets Reviewed, It will be Live</h5>
                            </div>
                        </div>
                        <div className="row align-items-center bg-light" style={{ boxShadow: '1.2px 1px 2px 1px rgb(187,187,190)', marginBottom: 18 }}>
                            <div className="col">
                                <div className="row">
                                    <div className="col-lg-6 col-xl-5" style={{ paddingBottom: 5 }}>
                                        <h3 className="text-primary"><strong>{job.companyName}</strong></h3>
                                        <h5 className="text-dark"><strong>{job.jobRole}</strong></h5>
                                        <div><label className="form-label">Contact Person</label><span style={{ marginLeft: 8 }}><strong>{job.companyContactPerson}</strong></span></div>
                                        <div><label className="form-label">Company Email</label><span style={{ marginLeft: 8 }}><strong>{job.companyEmail}</strong></span></div>
                                        <div><label className="form-label">Company Contact</label><span style={{ marginLeft: 8 }}><strong>{job.contactPersonPhone}</strong></span></div>
                                        <div><label className="form-label">Company Address</label><span style={{ marginLeft: 8 }}><strong>{job.companyAddress}</strong></span></div>
                                        <hr className="d-block d-md-none" />
                                    </div>
                                    <div className="col-md-8 col-lg-6 col-xl-4 col-xxl-4" style={{ paddingBottom: 5 }}>
                                        <div><label className="form-label">Candidates Required</label><span style={{ marginLeft: 8 }}><strong>{job.candidatesRequired}</strong></span></div>
                                        <div><label className="form-label">Class Required</label><span style={{ marginLeft: 8 }}><strong>{job.class && job.class.map((elem) => (`${elem.toString()}, `))}</strong></span></div>
                                        <div><label className="form-label">Class Year</label><span style={{ marginLeft: 8 }}><strong>{job.eligibility && job.eligibility.map((elem) => (`${elem.toString()}, `))}</strong></span></div>
                                        <div><label className="form-label">Job Type</label><span style={{ marginLeft: 8 }}><strong>{job.jobType && job.jobType.map((elem) => (`${elem.toString()}, `))}</strong></span></div>
                                        <div><label className="form-label">Salary Per Month</label><span style={{ marginLeft: 8 }}><strong>{Number(job.salaryPM).toString()}</strong></span></div>
                                        <div><label className="form-label">Last Date to apply</label><span style={{ marginLeft: 8 }}><strong><Moment format='D MMM YYYY, hh:mm'>{job.lastDateToApply && job.lastDateToApply}</Moment></strong></span></div>
                                        <hr className="d-block d-md-none" />
                                    </div>
                                    <div className="col-md-4 col-xl-3 col-xxl-3" style={{ paddingBottom: 5 }}>
                                        <div><label className="form-label">Created At</label><span style={{ marginLeft: 8 }}><br /><strong><Moment format='D MMM YYYY, hh:mm'>{job.createdAt && job.createdAt}</Moment></strong></span></div>
                                        <div><label className="form-label">ID</label><span style={{ marginLeft: 8 }}><br /><strong>{job._id}</strong></span></div>
                                        <div className="d-flex gap-3">
                                            <button onClick={() => { navigator.clipboard.writeText(job._id); }} className="btn btn-success" type="button"><ContentCopyIcon /> Click To Copy the Job ID</button>
                                        </div>
                                        <hr className="d-block d-md-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }

        </Fragment>
    );
};

export default JobCreatedSuccessfully;