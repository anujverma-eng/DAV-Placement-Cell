import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/studentAction';
import { useLocation } from 'react-router-dom';
import './Navbar.css';
import { Navbar as Navbars, Nav, Container } from 'react-bootstrap';

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
    // <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ display: displayNavbar }}>
    //   <div className="container-fluid"><Link className="navbar-brand" to="/">D.A.V. Placement Cell</Link><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
    //     <div className="collapse navbar-collapse" id="navcol-1">
    //       <ul className="navbar-nav">
    //         <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
    //         {(!student || (student && student.role === 'admin')) && <li className="nav-item"><Link className="nav-link" to="/new/job">Post Job</Link></li>}
    //         {!student && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
    //         <li className="nav-item"><a href='/login' className="nav-link" style={{ cursor: "pointer" }} onClick={(e) => { logoutMe(); }}>Logout</a></li>
    //         {student && student.role === 'admin' ? <li className="nav-item"><Link to={'/admin/dashboard'} className="nav-link" style={{ cursor: "pointer" }} >Dashboard</Link></li> : <li />}
    //       </ul>
    //     </div>
    //   </div>
    // </nav >
    // <nav className="navbar navbar-light navbar-expand-md fixed-top bg-light navbar-shrink py-3" id="mainNav" style={{ display: displayNavbar }}>
    //   <div className="container"><a className="navbar-brand d-flex align-items-center" href="/"><span className="shadow d-flex justify-content-center align-items-center me-2 bs-icon"><img className="img-fluid" alt='Logo' src="davLogo.png" /></span><span>D.A.V. Placement Cell</span></a><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
    //     <div className="collapse navbar-collapse" id="navcol-1">
    //       <ul className="navbar-nav mx-auto">
    //         <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
    //         <li className="nav-item"><Link className="nav-link" to="/">About Us</Link></li>
    //         <li className="nav-item"><Link className="nav-link" to="/">Contact Us</Link></li>
    //         {(!student || (student && student.role === 'admin')) && <li className="nav-item"><Link className="nav-link" to="/new/job">Post Job</Link></li>}
    //         <li className="nav-item" />
    //         {student && student.role === 'admin' ? <li className="nav-item"><Link to={'/admin/dashboard'} className="nav-link" style={{ cursor: "pointer" }} >Dashboard</Link></li> : <li />}
    //       </ul>
    //       {!student && <Link className="btn btn-primary shadow" role="button" to="/login">Login</Link>}
    //       {student && <a href='/login' onClick={(e) => { logoutMe(); }} style={{ cursor: "pointer" }} className="btn btn-primary shadow" role="button">Logout</a>}
    //     </div>
    //   </div>
    //   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>

    // </nav>
    <Navbars sticky="top" collapseOnSelect expand="lg" bg="light" variant="light" style={{ display: displayNavbar }}>
      <Container>
        <Navbars.Brand><Link className="navbar-brand d-flex align-items-center" to="/"><span className="shadow d-flex justify-content-center align-items-center me-2 bs-icon"><img className="img-fluid" alt='Logo' src="davLogo.png" /></span><span>D.A.V. Placements</span></Link> </Navbars.Brand>
        <Navbars.Toggle aria-controls="responsive-navbar-nav" />
        <Navbars.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">About Us</Nav.Link>
            <Nav.Link href="/">Contact Us</Nav.Link>
            {(!student || (student && student.role === 'admin')) && <li className="nav-item"><Link className="nav-link" to="/new/job">Post Job</Link></li>}
            {student && student.role === 'admin' ? <li className="nav-item"><Link to={'/admin/dashboard'} className="nav-link" style={{ cursor: "pointer" }} >Dashboard</Link></li> : <li />}
          </Nav>
          <Nav>
            {!student && <Link className="btn btn-primary shadow" role="button" to="/login">Login</Link>}
            {student && <a href='/login' onClick={(e) => { logoutMe(); }} style={{ cursor: "pointer" }} className="btn btn-primary shadow" role="button">Logout</a>}
          </Nav>
        </Navbars.Collapse>
      </Container>
    </Navbars>
  );
};

export default Navbar;