import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStudentAdmin, getAllStudentsAdmin } from '../../../actions/studentAction';
import { useAlert } from 'react-alert';
import Moment from 'react-moment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Metadata from '../../Layouts/Metadata';
import Loader from '../../Layouts/Loader/Loader';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const AllStudents = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, students } = useSelector((state) => state.adminStudentsReducer);

  // this is for delete student request
  const { isDeleted } = useSelector((state) => state.updateStudentProfileReducer);

  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isDeleted) {
      alert.info("Student Deleted Successfully");
    }
    dispatch(getAllStudentsAdmin());
  }, [dispatch, alert, error, isDeleted]);

  const handleDelete = (id) => {
    setOpen(true);
    setStudentId(id);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteYES = () => {
    setOpen(false);
    if (studentId !== "") {
      dispatch(deleteStudentAdmin(studentId));
    }
  };


  return (
    <Fragment>
      <Metadata title={"All Students"} />
      {loading ? <Loader /> :
        <div>
          <div id="content">
            <div className="container-fluid">
              {(students && students.length !== 0) ?
                students.map((element, idx) => (
                  (element.role !== 'admin' &&
                    <div className="row align-items-center" style={{ boxShadow: '1.2px 1px 2px 1px rgb(187,187,190)', marginBottom: 18 }} key={idx}>
                      <div className="col">
                        <div className="row">
                          <div className="col-lg-7 col-xl-6 col-xxl-5" style={{ paddingBottom: 5 }}>
                            <div className="row justify-content-center align-items-center">
                              <div className="col align-self-center"><img className="img-fluid" src={element.avatar.url} alt="Profile" style={{ height: 180, width: 'auto' }} /></div>
                              <div className="col">
                                <div><span className="text-capitalize text-primary"><strong>{`${element.firstName} ${element.lastName}`}</strong></span></div>
                                <div><span className="text-capitalize text-dark"><strong>{`${element.classIn}, ${element.year}`}</strong></span></div>
                                <div><span><strong>{element.phone}</strong></span></div>
                                <div><span><strong>{element.email}</strong></span></div>
                                <div><span><strong>{element.class10}</strong></span><label className="form-label" style={{ marginLeft: 5, marginBottom: 0 }}>in Class 10th</label></div>
                                <div><span><strong>{element.class12}</strong></span><label className="form-label" style={{ marginLeft: 5, marginBottom: 0 }}>in Class 12th</label></div>
                                <div><span><strong>{element.graduation}</strong></span><label className="form-label" style={{ marginLeft: 5, marginBottom: 0 }}>in Graduation</label></div>
                              </div>
                            </div>
                            <hr className="d-block d-md-none" />
                          </div>
                          <div className="col-md-6 col-lg-5 col-xl-3 col-xxl-3" style={{ paddingBottom: 5 }}>
                            <div><label className="form-label">Class Roll No</label><span style={{ marginLeft: 8 }}><strong>{element.classRollNo}</strong></span></div>
                            <div><label className="form-label">University Roll No</label><span style={{ marginLeft: 8 }}><strong>{element.universityRollno}</strong></span></div>
                            <div><label className="form-label">Father's Name</label><span style={{ marginLeft: 8 }}><strong>{`Mr. ${element.fathersName}`}</strong></span></div>
                            <div><label className="form-label">Joined On</label><span style={{ marginLeft: 8 }}><strong><Moment format='D MMM YYYY'>{element.createdAt && element.createdAt}</Moment></strong></span></div>
                            <div><label className="form-label">Student ID</label><span style={{ marginLeft: 8 }}><br /><strong>{element._id}</strong></span></div>
                            <div className="d-flex gap-3"><Link to={`/admin/student/${element._id}`} className="btn btn-info btn-sm" type="button">View Student Profile</Link></div>
                            <hr className="d-block d-md-none" />
                          </div>
                          <div className="col-md-6 col-xl-3 col-xxl-4" style={{ paddingBottom: 5 }}>
                            <div><label className="form-label">Address</label><span style={{ marginLeft: 8 }}><strong>{element.address}</strong></span></div>
                            <div><label className="form-label">LinkedIn</label><a href={element.linkedInURL} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}><strong>{element.linkedInURL}</strong></a></div>
                            <div><label className="form-label">Social Link</label><a href={element.socialLink} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}><strong>{element.socialLink}</strong></a></div>
                            <div><label className="form-label">DOB</label><span style={{ marginLeft: 8 }}><strong><Moment format='D MMM YYYY'>{element.dateOfBirth && element.dateOfBirth}</Moment></strong></span></div>
                            <div className="d-flex gap-3"><button onClick={(e) => handleDelete(element._id)} className="btn btn-danger btn-sm" type="button"><DeleteForeverIcon />Delete Student</button></div>
                            <hr className="d-block d-md-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )

                ))
                :
                <div className="not">Not Found</div>
              }
            </div>
          </div>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this Student ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleDeleteYES}>Yes</Button>
            </DialogActions>
          </Dialog>
        </div>
      }
    </Fragment>
  );
};

export default AllStudents;
