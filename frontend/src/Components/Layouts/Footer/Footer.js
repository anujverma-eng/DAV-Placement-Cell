import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

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
    <div className='navbar' style={{ display: displayNavbar }}>
      <div >
        <ul className='item'>
          <li><a href="/">Footer</a></li>
          <li><a href="/">Footer</a></li>
          <li><a href="/">Footer</a></li>
        </ul>
      </div>
      <div><h1 className='item'><Link to="/">D.A.V. Placement Cell</Link></h1></div>
      <div>
        <ul className='item'>
          <li><a href="/">Footer</a></li>
          <li><a href="/">Footer</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;