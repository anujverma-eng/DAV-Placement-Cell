import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();

  const isAdmin = location.pathname.toString().includes("admin");
  const isLogin = location.pathname.toString().includes("login");
  const isJobCreatedSuccess = location.pathname.toString().includes("/job/success");



  let displayNavbar = "block";
  if (isAdmin || isJobCreatedSuccess) {
    displayNavbar = "none";
  } else if (isLogin) {
    displayNavbar = "none";
  } else {
    displayNavbar = "block";
  }

  return (
    // <div className='navbar' style={{ display: displayNavbar }}>
    //   <div >
    //     <ul className='item'>
    //       <li><a href="/">Footer</a></li>
    //       <li><a href="/">Footer</a></li>
    //       <li><a href="/">Footer</a></li>
    //     </ul>
    //   </div>
    //   <div><h1 className='item'><Link to="/">D.A.V. Placement Cell</Link></h1></div>
    //   <div>
    //     <ul className='item'>
    //       <li><a href="/">Footer</a></li>
    //       <li><a href="/">Footer</a></li>
    //     </ul>
    //   </div>
    // </div>
    <footer style={{ display: displayNavbar }}>
      <div className="row">
        <div className="col-sm-6 col-md-4 footer-navigation">
          <h3><Link to="/">D.A.V. Placement Cell</Link></h3>
          <p className="links"><Link to="/">Home</Link><strong>  </strong><Link to="/new/job">Post Job</Link><strong>  </strong><a href="/">About</a><strong>  </strong><a href="/">Contact</a></p>
          <p className="company-name">Copyright © 2022 , All Right Reserved by D.A.V.College, Jalandhar</p>
        </div>
        <div className="col-sm-6 col-md-4 footer-contacts">
          <div><span className="fa fa-map-marker footer-contacts-icon"> </span>
            <p><span className="new-line-span">Mahatma Hans Raj Marg, Dayanand Nagar</span> Jalandhar, Punjab 144008</p>
          </div>
          <div><i className="fa fa-phone footer-contacts-icon" />
            <p className="footer-center-info email text-start"> 0181 225 5641</p>
          </div>
          <div><i className="fa fa-envelope footer-contacts-icon" />
            <p> <a href="/" target="_blank">principal@davjalandhar.com</a></p>
          </div>
        </div>
        <div className="col-md-4 footer-about">
          <h4>About D.A.V College, Placenent Cell</h4>
          <p> Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet. </p>
          <div className="social-links social-icons"><a href="/"><i className="fa fa-facebook" /></a><a href="/"><i className="fa fa-twitter" /></a><a href="/"><i className="fa fa-linkedin" /></a><a href="/"><i className="fa fa-github" /></a></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;