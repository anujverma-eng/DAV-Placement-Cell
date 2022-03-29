import React from 'react';
import { Link } from 'react-router-dom';

const JobComponent = ({ job, lastDateToApply }) => {


  return (
    <div className="col-md-6 col-lg-6 text-center align-self-center" style={{ "marginBottom": "50px" }}>
      <div className="shadow" style={{ "borderRadius": "6px", "borderWidth": "0.2px", "borderStyle": "solid", "background": "#f2f2f2" }}>
        <h3 className="display-1 text-capitalize fs-3 fw-light text-center" style={{ "background": "#30383a", "color": "rgb(255,255,255)", "borderRadius": "4px", "borderColor": "#0d0d0d", padding: "5px", "textShadow": "1px 1px 2px rgb(64,63,63)", }}>{job.jobRole}</h3>
        <div className="shadow-sm" style={{ "padding": "2px 8px", "paddingTop": "0px" }}>
          <div style={{ "marginBottom": "5px" }}>
            <div className="row align-items-start">
              <div className="col-6 col-sm-6 col-md-5 col-lg-5 col-xl-5 col-xxl-6" style={{ "borderColor": "rgb(33, 37, 41)", "margin": "2px 5px", "padding": "5px 12px", "background": "var(--bs-yellow)", "boxShadow": "1px 1px 4px rgb(111,111,112)" }}>
                <h6 className="text-start" style={{ "margin": "0px" }}><strong>{job.companyName}</strong></h6>
                <div className="text-start"><a className='text-break' target={"_blank"} href={job.CompanyWebsite}>{job.CompanyWebsite}</a></div>
              </div>
              <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5 text-light align-self-center" style={{ "background": "#01ae31", "margin": "2px 5px", "marginRight": "5px", "padding": "5px 12px", "borderRadius": "4px", "boxShadow": "1px 1px 2px 0px rgb(109,106,106)" }}>
                <h6 className="text-start" style={{ "margin": "0px" }}>
                  {job.jobType.map((element, i) => {
                    const myStyle = { marginLeft: "5px" };
                    return (<span style={i > 0 ? myStyle : { marginLeft: "0px" }} key={i}>{element}</span>);
                  })}
                </h6>
                <div className="text-start"><span>{job.salaryPM !== 0 ? `${job.salaryPM}/month` : "None"}</span></div>
              </div>
            </div>
          </div>
          <div style={{ "marginBottom": "5px" }}>
            <div className="row align-items-center" style={{ "padding": "5px" }}>
              <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11" style={{ "padding": "5px 12px", "paddingLeft": "0px", "background": "var(--bs-gray-300)", "borderWidth": "0.5px", "borderStyle": "none", "margin": "2px 5px", "borderRadius": "4px" }}>
                <h6 className="text-start" style={{ "margin": "0px", "paddingLeft": "5px" }}><strong>Eligibility</strong></h6>
                <div className="text-start">
                  <div className="row" style={{ "padding": "0px 10px" }}>
                    {job.eligibility.map((element, i) => (
                      <div className="col-6 col-sm-6 col-md-6 col-lg-5 col-xl-3 col-xxl-3" key={i} style={{ "padding": "2px 5px" }}><span className="d-block">{element}</span></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-11 col-md-11" style={{ "padding": "5px 12px", "paddingLeft": "0px", margin: "2px 5px", "borderRadius": "3px", "borderWidth": "1.5px", "borderStyle": "outset" }}>
                <h6 className="text-start" style={{ "margin": "0px", "paddingLeft": "5px" }}><strong>Class Required</strong></h6>
                <div className="text-start">
                  <div className="row" style={{ "padding": "0px 10px" }}>
                    {job.class.map((element, i) => (
                      <div className="col-6 col-sm-6 col-md-6 col-lg-5 col-xl-3 col-xxl-3" key={i} style={{ "padding": "0px 5px" }}><span className="d-block">{element}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ "marginBottom": "5px" }}>
            <div className="row align-items-center" style={{ "padding": "5px" }}>
              <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11" style={{ "padding": "5px 12px", "paddingLeft": "0px", "background": "var(--bs-gray-300)", "borderWidth": "0.5px", "borderStyle": "none", "margin": "2px 5px", "borderRadius": "4px" }}>
                <h6 className="text-start" style={{ "margin": "0px", "paddingLeft": "5px" }}><strong>Skills Required</strong></h6>
                <div className="text-start">
                  <p className='text-break' style={{ "padding": "5px" }}>{job.skillsRequired}</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ "marginBottom": "5px" }}>
            <div className="row align-items-center" style={{ "padding": "5px" }}>
              <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11" style={{ "padding": "5px 12px", "paddingLeft": "0px", "margin": "2px 5px", "borderRadius": "4px", "borderWidth": "0.5px", "borderStyle": "double" }}>
                <div className="text-start"><span className="d-block d-md-inline" style={{ "padding": "5px" }}><strong>Last Date To Apply</strong></span><span style={{ "padding": "4px", "borderRadius": "4px", "color": "var(--bs-red)" }}><strong>{lastDateToApply}</strong></span></div>
              </div>
            </div>
          </div>
        </div>
        <Link className="btn btn-warning btn-sm fs-5 fw-normal" to={`/job/${job._id}`} role="button" style={{ "borderTopLeftRadius": "0px", "borderTopRightRadius": "0px", "width": "100%", "background": "rgb(254,231,21)" }}>View Details
          <i className="fa fa-share-square-o" style={{ "marginLeft": "10px" }}></i>
        </Link>
      </div>
    </div>
  );
};

export default JobComponent;