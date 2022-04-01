import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/studentAction';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, isAuthenticated, student } = useSelector((state) => state.studentReducer);

  const logoutMe = () => {
    if (error) {
      alert.error(error);
    }
    if (isAuthenticated) {
      alert.success("You have Logged Out Successfully.");
      dispatch(logout());
    }
  };

  const location = useLocation();
  const isAdmin = location.pathname.toString().includes("admin");
  let displayNavbar = "block";
  if (student && student.role === "admin" && isAdmin) {
    displayNavbar = "none";
  } else {
    displayNavbar = "block";
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ display: displayNavbar }}>
      <div className="container-fluid"><Link className="navbar-brand" to="/">D.A.V. Placement Cell</Link><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
            {(!student || (student && student.role === 'admin')) && <li className="nav-item"><Link className="nav-link" to="/new/job">Post Job</Link></li>}
            {!student && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
            <li className="nav-item"><a href='/login' className="nav-link" style={{ cursor: "pointer" }} onClick={(e) => { logoutMe(); }}>Logout</a></li>
            {student && student.role === 'admin' ? <li className="nav-item"><Link to={'/admin/dashboard'} className="nav-link" style={{ cursor: "pointer" }} >Dashboard</Link></li> : <li />}
          </ul>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;