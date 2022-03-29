import React, { Fragment, useEffect, useState } from 'react';
import './jobDetailsComponent.css';
import { clearErrors, getJobDetails } from '../../../actions/jobAction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import Loader from '../../Layouts/Loader/Loader';
import { useAlert } from 'react-alert';
import Metadata from '../../Layouts/Metadata';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { addToJobApplied, newJobApplied } from '../../../actions/appliedAction';

const JobDetailsComponent = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const { loading, error, job } = useSelector((state) => state.jobDetailsReducer);
    const { isAuthenticated } = useSelector((state) => state.studentReducer);
    const { message } = useSelector((state) => state.applyToNewJobReducer);
    const { appliedJobs } = useSelector((state) => state.addToAppliedReducer);

    let lastDateToApply = "";
    if (job.lastDateToApply !== undefined) {
        lastDateToApply = new Date(job.lastDateToApply).toDateString();
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message === "You have already applied") {
            alert.error("You have already applied");
            return dispatch(clearErrors());
        }
        if (isAuthenticated) {
            dispatch(getJobDetails(params.id));
        } else {
            navigate('/login', { replace: true });
        }
    }, [dispatch, params.id, alert, error, isAuthenticated, navigate, message]);



    //* For Terms & Conditions Dialog Box
    const [open, setOpen] = useState(false);
    const [agree, setAgree] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setAgree(false);
    };

    const handleAgree = () => {
        setAgree(true);
        setOpen(false);
    };


    let checkIf = false;
    if (appliedJobs) {
        checkIf = appliedJobs.map((element) => {
            console.log(element.id);
            if (element.job.toString() === params.id) {
                return true;
            } else {
                return false;
            }
        });
    }

    const handleApplyNow = () => {
        const appliedJobID = { job: params.id };
        dispatch(newJobApplied(appliedJobID));
        dispatch(addToJobApplied(params.id));

        console.log(appliedJobs);

        //Means if there is no true present in checkIf array -- means it must contains all false
        if (!checkIf.includes(true)) {
            alert.success("You have applied successfully");
        }

    };

    return (
        <Fragment>
            <Metadata title={`Placement Cell || ${job.companyName}`} />
            {job && loading ? <Loader /> :
                <div className="container">
                    <div className="shadow" style={{ marginBottom: "81px" }}>
                        <div className="row" style={{ margin: "0px" }}>
                            <div className="col">
                                <div className="d-flex justify-content-between" style={{ padding: "5px", marginBottom: "8px" }}>
                                    <h1 className="text-center d-inline">{job.companyName}</h1><a className="link-dark" href={job.CompanyWebsite} target={'_blank'} rel="noopener noreferrer"><i className="fa fa-location-arrow fs-5"></i></a>
                                </div>
                                <div style={{ padding: "5px", background: "var(--bs-yellow)", borderRadius: "4px", marginBottom: "8px" }}><label className="form-label"><strong>About</strong></label>
                                    <p className='text-break' >{job.companyDescription}</p>
                                </div>
                                <div className="shadow" style={{ padding: "5px", borderRadius: "4px", marginBottom: "8px", background: "#3a6b35", color: "#fee715" }}><label className="form-label"><strong>Skills Required</strong></label>
                                    <p className='text-break' >{job.skillsRequired}</p>
                                </div>
                                <div style={{ padding: "5px", background: "var(--bs-gray-300)", borderRadius: "4px", marginBottom: "8px" }}><label className="form-label"><strong>Documents Required At Interview</strong></label>
                                    <p className='text-break' >{job.docsRequiredAtInterview}</p>
                                </div>
                                <div style={{ padding: "5px", background: "var(--bs-gray-400)", borderRadius: "4px", marginBottom: "8px" }}><label className="form-label"><strong>Documents Required At Joining</strong></label>
                                    <p className='text-break' >{job.docsRequiredAtJoining}</p>
                                </div>
                                <div style={{ padding: "5px", background: "var(--bs-gray-400)", borderRadius: "4px", marginBottom: "8px" }}><label className="form-label"><strong>Additional Details</strong><br /></label>
                                    <p className='text-break' >{job.additionalDetails}</p>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div style={{ marginBottom: "8px", padding: "5px" }}>
                                    <h1>{job.jobRole}</h1>
                                </div>
                                <div className="text-end"><span style={{ margin: "5px" }}>Last Date To Apply</span><span className="text-danger" style={{ margin: "5px" }}><strong>{lastDateToApply}</strong></span></div>
                                <div style={{ marginBottom: "8px", padding: "5px" }}>
                                    <div className="row">
                                        <div className="col" style={{ background: "var(--bs-gray-300)" }}>
                                            <div style={{ marginBottom: "8px", padding: "5px" }}><label className="form-label"><strong>Job Type</strong></label>
                                                <div className="row">
                                                    {job.jobType && job.jobType.map((element, i) => (
                                                        <div key={i} className="col"><span>{element}</span></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col" style={{ background: "#fee715", color: "#101820" }}>
                                            <div style={{ marginBottom: "8px", padding: "5px" }}><label className="form-label"><strong>Salary / Stipend</strong><br /></label>
                                                <h3>Rs. {job.salaryPM}<span>/month</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "8px", padding: "5px" }}>
                                    <div className="row">
                                        <div className="col" style={{ background: "#fee715", color: "rgb(16,24,32)" }}>
                                            <div style={{ marginBottom: "8px", padding: "5px" }}><label className="form-label"><strong>Eligibility</strong></label>
                                                <div className="row">
                                                    {job.eligibility && job.eligibility.map((element, i) => (
                                                        <div key={i} className="col"><span>{element}</span></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col" style={{ background: "var(--bs-gray-300)" }}>
                                            <div style={{ marginBottom: "8px", padding: "5px" }}><label className="form-label"><strong>Class Required</strong></label>
                                                <div className="row">
                                                    {job.class && job.class.map((element, i) => (
                                                        <div key={i} className="col"><span>{element}</span></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "8px", padding: "5px" }}><label className="form-label"><strong>Job Description</strong></label>
                                    <p className='text-break'>{job.jobDescription}</p>
                                </div>
                            </div>
                        </div>
                        {checkIf.includes(true) ?
                            <div className="row">
                                <div className="col">
                                    <div className="text-center" style={{ padding: "8px" }}>
                                        <button disabled={!isAuthenticated} className="btn btn-outline-primary" type="button" style={{ width: "121.5px" }}>Check Status</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className="col">
                                    <div className="text-center" style={{ padding: "8px" }}>
                                        <div className="form-check form-check-inline"><input required checked={agree} onChange={handleClickOpen} className="form-check-input" type="checkbox" id="formCheck-1" /><label className="form-check-label" htmlFor="formCheck-1">I Agree to the {'\u00A0'},<a href='t&c'>terms & Conditions</a></label></div>
                                    </div>
                                    <div className="text-center" style={{ padding: "8px" }}>
                                        <button onClick={handleApplyNow} disabled={!agree} className="btn btn-outline-primary" type="button" style={{ width: "121.5px" }}>Apply Now</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <Dialog open={open} onClose={handleClose} scroll={"paper"} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                        <DialogTitle id="scroll-dialog-title">Terms & Conditions</DialogTitle>
                        <DialogContent dividers>
                            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ab quasi culpa consequuntur blanditiis nobis maiores optio. Architecto, commodi illo. Facere veritatis quos illum repudiandae dolores consequatur odit harum soluta autem suscipit qui omnis fuga, inventore aperiam excepturi quis, fugit ad, non accusamus! Vitae, nobis rem. Ea ducimus reprehenderit, eligendi numquam saepe vel eos dolores quasi dolorem doloribus tempora aliquam nam fuga dolorum dolore quod veniam, odit magnam, reiciendis recusandae et obcaecati necessitatibus ex? Est rerum assumenda, ratione dolorem quasi iure expedita, molestias enim quis soluta ducimus? Debitis quidem numquam iusto expedita maiores, accusamus neque officia repellendus veritatis animi, sapiente voluptatem assumenda laboriosam cum dolore placeat consectetur. Eum aut sapiente cumque perspiciatis tempora ducimus similique iure hic necessitatibus, nihil illo minima exercitationem autem ullam. Consequuntur quos, harum, voluptate pariatur explicabo nulla dolorum labore placeat impedit quas, eligendi eum. Omnis, nam? Et eaque dolor dolores maxime placeat quisquam quos quidem numquam ducimus. At minima quibusdam nam nihil laudantium assumenda iste, itaque unde! Repudiandae ullam nesciunt nulla consectetur tempore quis eveniet ratione praesentium molestias temporibus, aliquam illo omnis accusantium ad excepturi error veritatis eius sunt odio aspernatur. Pariatur nisi modi ratione tempore eaque esse commodi quos necessitatibus earum consectetur? Quam quia nam ab! Ipsa, magni laboriosam laudantium fugit corrupti voluptates eveniet atque dolor et nostrum quia dolorem dicta neque distinctio doloribus minima commodi totam voluptatibus obcaecati! Consequuntur accusamus molestiae tempora itaque a voluptatibus, ex alias mollitia, numquam ipsam velit tempore, praesentium illum. Unde voluptas quia nemo, soluta, atque cumque mollitia aspernatur suscipit officiis quam exercitationem nostrum repellat iste eum rerum sit tenetur minima quibusdam magni. Magni vel reiciendis harum velit repellendus veritatis deserunt ullam culpa vitae suscipit, consequatur assumenda dolorem! Nulla error sequi necessitatibus eum maxime nostrum et labore sapiente laudantium voluptatem, sunt vitae, veritatis eius officia vero quo, ullam iusto distinctio incidunt asperiores harum sint? Tempora porro nesciunt quam deleniti. Facere laudantium eius quia inventore ab laborum reprehenderit natus dolores obcaecati, praesentium distinctio eveniet quasi debitis ipsum facilis dolore eum saepe vel? Cupiditate officiis sunt, non voluptates officia perspiciatis a distinctio nihil molestiae, recusandae voluptate assumenda debitis pariatur autem deleniti molestias rem beatae fugit nam at, doloremque deserunt qui ducimus aperiam. Praesentium, a voluptates doloremque dignissimos nulla modi incidunt voluptatem quas inventore libero! Accusamus cum fugit amet, rerum suscipit iure qui! Incidunt amet totam eius dolor non necessitatibus repellendus sequi minima asperiores odit, labore quibusdam nulla facere sapiente veritatis esse placeat. Possimus nam, ea beatae, molestiae dolor eos maiores quas eligendi asperiores voluptatem fugit aspernatur! Ab sequi debitis asperiores sint quia reiciendis quo illo et earum obcaecati similique voluptate voluptatem quisquam dolorem ratione quaerat magni officiis itaque nulla, voluptates dolorum officia architecto, a placeat. Possimus numquam doloremque, est impedit libero minima repudiandae tempora natus eius voluptatibus placeat in optio adipisci maxime deleniti quisquam obcaecati. Sint expedita id, animi, sequi quam unde, libero illum nulla ut porro ullam ab? Tempore aspernatur porro officiis dolorum reprehenderit ipsam soluta non laudantium est ut! Eveniet accusantium, eligendi consequatur laboriosam totam illo ipsa doloribus? Laboriosam, nam.
                            </DialogContentText>



                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={handleAgree}>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
        </Fragment>
    );
};

export default JobDetailsComponent;
