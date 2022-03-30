import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Navbar from './Components/Layouts/Navbar/Navbar';
import Footer from './Components/Layouts/Footer/Footer';
import Home from './Components/Home/Home';
import webFont from 'webfontloader';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginComponent from './Components/User/LoginSignUp/LoginComponent';
import SignUpComponent from './Components/User/LoginSignUp/SignUpComponent';
import store from './store';
import { loadStudent } from './actions/studentAction';
import CreateJob from './Components/Jobs/createJob/CreateJob';
import { useSelector } from 'react-redux';
import UserOptions from './Components/Layouts/UserOptions/UserOptions.js';
import ProtectedRoute from './Components/Protected Routes/ProtectedRoute';
import ProtectedUpdateRoute from './Components/Protected Routes/ProtectedUpdateRoute';
import UpdatePassword from './Components/User/UpdatePassword/UpdatePassword';
import ResetPassword from './Components/User/ResetPassword/ResetPassword';
import ProtectedRouteMyApplied from './Components/Protected Routes/ProtectedRouteMyApplied';
import ProtectedJobDetailsRoute from './Components/Protected Routes/ProtectedJobDetailsRoute';
import AdminProtectedDashboard from './Components/Protected Routes/AdminProtection/AdminProtectedDashboard';

function App() {
  const { isAuthenticated, student, error } = useSelector((state) => state.studentReducer);

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadStudent());
  }, []);


  return (
    <Router>
      <Navbar />
      {isAuthenticated && <UserOptions isAuthenticated={isAuthenticated} error={error} student={student} />}
      {!isAuthenticated && <Link to={'login'} />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/job/:id' element={<ProtectedJobDetailsRoute isAuthenticated={isAuthenticated} error={error} student={student} />} />
        <Route exact path='/login' element={<LoginComponent />} />
        <Route exact path='/register' element={<SignUpComponent />} />
        <Route exact path='/new/job' element={<CreateJob />} />
        <Route exact path='/account' element={<ProtectedRoute isAuthenticated={isAuthenticated} error={error} student={student} />} />
        <Route exact path='/myApplied' element={<ProtectedRouteMyApplied isAuthenticated={isAuthenticated} error={error} student={student} />} />
        <Route exact path='/profile/update' element={<ProtectedUpdateRoute isAuthenticated={isAuthenticated} />} />
        <Route exact path='/password/forgot' element={<UpdatePassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='admin/dashboard' element={<AdminProtectedDashboard isAuthenticated={isAuthenticated} error={error} student={student} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
