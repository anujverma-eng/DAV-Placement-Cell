import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Metadata from '../../Layouts/Metadata';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Moment from 'react-moment';
import Loader from '../../Layouts/Loader/Loader';
import { useAlert } from 'react-alert';
import { getAdminJobs } from '../../../actions/jobAction';

const MustDeleteJobs = () => {

    const dispatch = useDispatch();
    const { loading, error, jobs } = useSelector((state) => state.adminJobReducer);

    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
        }
        dispatch(getAdminJobs("Rejected", true));
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            <Metadata title="Must Delete Jobs" />
            {loading ? <Loader /> :
                <div>
                    <div id="content">
                        <div className="container-fluid">
                            {jobs ?
                                jobs.map((element, idx) =>
                                (<div className="row align-items-center bg-light" style={{ boxShadow: '1.2px 1px 2px 1px rgb(187,187,190)', marginBottom: 18 }} key={idx}>
                                    <div className="col">
                                        <div className="d-inline"><i className="fa fa-circle text-center text-danger" style={{ fontSize: 10, padding: 2 }} /><label className="form-label text-danger" style={{ margin: 0 }}>Pending</label></div>
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
                                                <div className="d-flex gap-3"><button className="btn btn-danger" type="button"><DeleteForeverIcon /></button><button className="btn btn-primary" type="button"><EditIcon /></button></div>
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
                </div>
            }

        </Fragment>
    );
};

export default MustDeleteJobs;