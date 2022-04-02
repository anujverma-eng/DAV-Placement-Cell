import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAllAppliedAdmin } from '../../../actions/appliedAction';
import Loader from '../../Layouts/Loader/Loader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const AllAppliedStudents = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, jobApplied } = useSelector((state) => state.adminAllAppliedReducer);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllAppliedAdmin());
    }, [dispatch, error, alert]);

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
                                                    <div><label className="form-label">Applied In</label><span className="text-info" style={{ marginLeft: 8 }}><strong>{element.appliedJobs[0].job.companyName}</strong></span></div>
                                                    <div><label className="form-label">Profile</label><span className="text-dark" style={{ marginLeft: 8 }}><strong>{element.appliedJobs[0].job.jobRole}</strong></span></div>
                                                    <div><label className="form-label">Job Type</label><span className="text-success" style={{ marginLeft: 8 }}><strong>{element.appliedJobs[0].job.jobType}</strong></span></div>
                                                    <div><label className="form-label">Salary / Stipend</label><span style={{ marginLeft: 8 }}><strong>{element.appliedJobs[0].job.salaryPM}</strong></span></div>
                                                    <div><label className="form-label">Last Date to apply</label><span style={{ marginLeft: 8 }}><strong><Moment format='DD MMM YYYY, hh:mm'>{element.appliedJobs[0].job.lastDateToApply}</Moment></strong></span></div>
                                                    <div className="d-flex gap-3"><Link to={`/job/${element.appliedJobs[0].job._id}`} className="btn btn-dark btn-sm" role="button">Job Details</Link><Link to={`/admin/student/${element.student._id}`} className="btn btn-info btn-sm" role="button">Student Profile</Link></div>
                                                    <hr className="d-block d-md-none" />
                                                </div>
                                                <div className="col-md-6 col-xl-3 col-xxl-4" style={{ paddingBottom: 5 }}>
                                                    <div><label className="form-label">Applied on</label><span style={{ marginLeft: 8 }}><strong><Moment format='DD MMM YYYY, hh:mm'></Moment></strong></span></div>
                                                    <div><label className="form-label">Student Id</label><span style={{ marginLeft: 8 }}><strong>{element.student._id}</strong></span></div>
                                                    <div><label className="form-label">Job Id</label><span style={{ marginLeft: 8 }}><strong>{element.appliedJobs[0].job._id}</strong></span></div>
                                                    <div><label className="form-label">Applied Id</label><span style={{ marginLeft: 8 }}><strong>{element._id}</strong></span></div>
                                                    <div className="text-success"><label className="form-label">Status</label><span className="text-danger" style={{ marginLeft: 8 }}><strong>{element.interviewStatus}</strong></span></div>
                                                    <div className="d-flex gap-3"><button className="btn btn-danger btn-sm" type="button"><DeleteForeverIcon /></button><button className="btn btn-primary btn-sm" type="button"><EditIcon /></button></div>
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
                </div>
            }
        </Fragment >
    );
};

export default AllAppliedStudents;