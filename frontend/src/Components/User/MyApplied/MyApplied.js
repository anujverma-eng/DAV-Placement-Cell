import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './MyApplied.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myApplied } from '../../../actions/appliedAction';
import Loader from '../../Layouts/Loader/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@mui/material';
import MetaData from '../../Layouts/Metadata';
import LaunchIcon from '@mui/icons-material/Launch';

const MyApplied = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, jobApplied } = useSelector((state) => state.myAppliedReducer);
  const { student } = useSelector((state) => state.studentReducer);

  const columns = [
    {
      field: 'id', headerName: 'Job Details', minWidth: 130, flex: 0.25, renderCell: (params) => {
        return (
          <Link to={`/job/${params.getValue(params.id, "id")}`}><LaunchIcon /></Link>
        );
      }
    },
    { field: 'companyName', headerName: 'Company', minWidth: 150, flex: 0.5 },
    { field: 'salaryPM', headerName: 'Salary Per Month', minWidth: 170, flex: 0.3, },
    { field: 'jobType', headerName: 'Job Type', minWidth: 150, flex: 0.5 },
    {
      field: 'interviewStatus', headerName: 'Selection Status', minWidth: 170, flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "interviewStatus") === "Selected" ? "greenColor" : "redColor";
      }
    },
    {
      field: 'whatsappLink', headerName: 'WhatsApp Link', minWidth: 170, flex: 0.5, renderCell: (params) => {
        return (
          <a href={`${params.getValue(params.id, "whatsappLink")}`} target="_blank" rel='noopener noreferrer'><LaunchIcon /></a>
        );
      }
    },
    { field: 'createdAt', headerName: 'Applied On', minWidth: 150, flex: 0.5 },
  ];
  const rows = [];

  jobApplied && jobApplied.forEach((element, idx) => {
    console.log(element);
    rows.push({
      id: element.appliedJobs[0].job._id,
      companyName: element.appliedJobs[0].job.companyName,
      salaryPM: element.appliedJobs[0].job.salaryPM,
      jobType: element.appliedJobs[0].job.jobType,
      whatsappLink: element.appliedJobs[0].job.whatsappLink,
      interviewStatus: element.interviewStatus,
      createdAt: new Date(element.createdAt).toDateString(),
    });
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(myApplied());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title={`${student.firstName}'s Applied`} />
      {loading ? (<Loader />)
        :
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='myOrdersTable'
            autoHeight
          />
          <Typography id="myOrdersHeading">{student.firstName}'s Applied</Typography>
        </div>
      }

    </Fragment>
  );
};

export default MyApplied;