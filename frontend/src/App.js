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
import JobDetailsComponent from './Components/Jobs/JobDetails/jobDetailsComponent';
import UpdatePassword from './Components/User/UpdatePassword/UpdatePassword';
import ResetPassword from './Components/User/ResetPassword/ResetPassword';
import AdminProtection from './Components/Protected Routes/AdminProtection/AdminProtection';
import Dashboard from './Components/Admin Components/Dashboard/Dashboard';
import ProfileComponent from './Components/User/ProfileComponent/ProfileComponent';
import MyApplied from './Components/User/MyApplied/MyApplied';
import UpdateProfileComponent from './Components/User/ProfileComponent/UpdateProfileComponent';
import PendingJobs from './Components/Admin Components/PendingJobs/PendingJobs';
import MustDeleteJobs from './Components/Admin Components/MustDeleteJobs/MustDeleteJobs';
import AllStudents from './Components/Admin Components/AllStudents/AllStudents';
import StudentProfileDetails from './Components/Admin Components/StudentProfileDetails/StudentProfileDetails';
import AllAppliedStudents from './Components/Admin Components/AllAppliedStudents/AllAppliedStudents';
import AllAppliedStudentsSelected from './Components/Admin Components/AllAppliedStudents/AllAppliedStudentsSelected';
import AllAppliedStudentsNotSelected from './Components/Admin Components/AllAppliedStudents/AllAppliedStudentsNotSelected';
import WhoApplied from './Components/Admin Components/AllAppliedStudents/WhoApplied';

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
        <Route exact path='/login' element={<LoginComponent />} />
        <Route exact path='/register' element={<SignUpComponent />} />
        <Route exact path='/new/job' element={<CreateJob />} />

        <Route exact path='/job/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} error={error} element={<JobDetailsComponent />} />} />
        <Route exact path='/account' element={<ProtectedRoute isAuthenticated={isAuthenticated} error={error} element={<ProfileComponent />} />} />
        <Route exact path='/myApplied' element={<ProtectedRoute isAuthenticated={isAuthenticated} error={error} element={<MyApplied />} />} />
        <Route exact path='/profile/update' element={<ProtectedRoute isAuthenticated={isAuthenticated} error={error} element={<UpdateProfileComponent />} />} />



        <Route exact path='/password/forgot' element={<UpdatePassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />

        <Route exact path='/admin/dashboard' element={<AdminProtection isAuthenticated={isAuthenticated} error={error} student={student} element={<Dashboard />} />} />
        <Route exact path='/admin/jobs/pending' element={<AdminProtection isAuthenticated={isAuthenticated} error={error} student={student} element={<PendingJobs />} />} />
        <Route exact path='/admin/jobs/must/delete' element={<AdminProtection isAuthenticated={isAuthenticated} error={error} student={student} element={<MustDeleteJobs />} />} />
        <Route exact path='/admin/students/all' element={<AdminProtection isAuthenticated={isAuthenticated} error={error} student={student} element={<AllStudents />} />} />
        <Route exact path='/admin/student/:id' element={<AdminProtection isAuthenticated={isAuthenticated} error={error} student={student} element={<StudentProfileDetails />} />} />
        <Route exact path='/admin/selection' element={<AdminProtection isAuthenticated={isAuthenticated} error={error} student={student} element={<AllAppliedStudents />} />} />
        <Route exact path='/admin/students/selected' element={<AdminProtection isAuthenticated={isAuthenticated} error={error} student={student} element={<AllAppliedStudentsSelected />} />} />
        <Route exact path='/admin/students/notSelected' element={<AdminProtection isAuthenticated={isAuthenticated} error={error} student={student} element={<AllAppliedStudentsNotSelected />} />} />
        <Route exact path='/admin/get/candidates' element={<AdminProtection isAuthenticated={isAuthenticated} error={error} student={student} element={<WhoApplied />} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
