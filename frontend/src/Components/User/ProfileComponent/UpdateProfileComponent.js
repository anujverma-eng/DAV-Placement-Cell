import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, loadStudent, updateStudentProfile } from '../../../actions/studentAction';
import { useAlert } from 'react-alert';
import Loader from '../../Layouts/Loader/Loader';
import Metadata from '../../Layouts/Metadata';
import { UPDATE_PROFILE_RESET } from '../../../constants/studentConstants';

const UpdateProfileComponent = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { student } = useSelector((state) => state.studentReducer);
    const { error, isUpdated, loading } = useSelector((state) => state.updateStudentProfileReducer);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadStudent());

            navigate('/account', { replace: true });

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }

    }, [dispatch, error, alert, navigate, isUpdated]);

    // Convert the date to YYYY-MM-DD
    let DOB = "";
    if (student) {
        try {
            DOB = new Date(student.dateOfBirth).toISOString().slice(0, 10);
        } catch (error) {
            DOB = "1999-01-01";
        }
    }


    const [user, setUser] = useState({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        fathersName: student.fathersName,
        address: student.address,
        classIn: student.classIn,
        year: student.year,
        classRollNo: student.classRollNo,
        universityRollno: student.universityRollno,
        class10: student.class10,
        class12: student.class12,
        graduation: student.graduation,
        projects: student.projects,
        about: student.about,
        objective: student.objective,
        experience: student.experience,
        skills: student.skills,
        dateOfBirth: DOB,
        linkedInURL: student.linkedInURL,
        socialLink: student.socialLink

    });

    let url = "/Profile.png";
    try {
        url = student.avatar.url;
    } catch (error) {
        url = "/Profile.png";
    }
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(url);


    const { firstName, lastName, email, phone, fathersName, address, classIn, year, classRollNo, universityRollno, class10, class12, graduation, projects, about, objective, experience, skills, linkedInURL, socialLink, dateOfBirth } = user;
    const registerFormSubmit = (e) => {

        e.preventDefault();
        const myForm = new FormData();
        myForm.append("firstName", firstName);
        myForm.append("lastName", lastName);
        myForm.append("email", email);
        myForm.append("phone", phone);
        myForm.append("fathersName", fathersName);
        myForm.append("address", address);
        myForm.append("classIn", classIn);
        myForm.append("year", year);
        myForm.append("classRollNo", classRollNo);
        myForm.append("universityRollno", universityRollno);
        myForm.append("class10", class10);
        myForm.append("class12", class12);
        myForm.append("graduation", graduation);
        myForm.append("projects", projects);
        myForm.append("about", about);
        myForm.append("objective", objective);
        myForm.append("experience", experience);
        myForm.append("avatar", avatar);
        myForm.append("dateOfBirth", dateOfBirth);
        myForm.append("skills", skills);
        myForm.append("linkedInURL", linkedInURL);
        myForm.append("socialLink", socialLink);

        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
        dispatch(updateStudentProfile(myForm));

    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };


    return (
        <Fragment>
            <Metadata title="Update Profile" />
            {loading ? <Loader /> :
                <div className="container">
                    <div className="row g-0 text-center d-flex">
                        <div className="col">
                            <form encType="multipart/form-data" onSubmit={registerFormSubmit} className="shadow px-xs-0 px-sm-3 px-md-3 px-lg-0 pb-3" style={{ background: '#fffdfd' }} method="post" title="Register With Us.">
                                <h1 className="display-3 text-center text-secondary mb-3">Update Profile</h1>
                                <div>
                                    <div className="row justify-content-center align-items-center mb-2">
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start py-sm-2 py-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="firstName"><strong>First Name</strong><span>*</span></label>
                                            <input required className="shadow-sm form-control p-sm-2 p-md-1" type="text" placeholder="Enter First Name" name="firstName" onChange={registerDataChange} value={firstName} minLength={2} maxLength={15} title="Enter First Name" />
                                        </div>
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="lastName"><strong>Last Name</strong><span>*</span></label>
                                            <input required className="form-control p-sm-2 p-md-1" type="text" placeholder="Enter Last Name" name="lastName" onChange={registerDataChange} value={lastName} title="Enter Last Name" minLength={2} maxLength={15} />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="email" title="Student Email"><strong>Email</strong><span>*</span></label>
                                            <input required className="form-control p-sm-2 p-md-1" type="email" placeholder="Enter Email" name="email" onChange={registerDataChange} value={email} minLength={4} maxLength={30} title="Student Email" inputMode="email" />
                                        </div>
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="phone"><strong>Phone</strong><br /><span>*</span></label>
                                            <input required className="shadow-sm form-control p-sm-2 p-md-1" type="tel" placeholder="Enter Phone" name="phone" onChange={registerDataChange} value={phone} minLength={6} maxLength={11} inputMode="tel" title="Phone Number" pattern="^[0-9]*$" />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-auto col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="profile"><strong>Profile Icon (Must be less than 1 mb)</strong><br /><span>*</span></label>
                                            <div className="col-md-5 order-last" style={{ padding: 0 }}><img className="img-fluid" src={avatarPreview} alt="Profile Icon" /></div>
                                            <input className="form-control p-sm-2 p-md-1" type="file" placeholder="Choose Profile Image" name="avatar" onChange={registerDataChange} title="Choose Avatar" accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="fathersName" title="Father's Name"><strong>Father's Name</strong><span>*</span></label>
                                            <input required className="shadow-sm form-control p-sm-2 p-md-1" type="text" placeholder="Enter Father's Name" name="fathersName" onChange={registerDataChange} value={fathersName} minLength={3} maxLength={30} title="Father's Name" />
                                        </div>
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="address"><strong>Address</strong><br /><span>*</span></label>
                                            <input required className="form-control p-sm-2 p-md-1" type="text" placeholder="Enter Address" name="address" onChange={registerDataChange} value={address} minLength={6} maxLength={80} title="House Address" />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="classIn" title="Pursuing Class"><strong>Class</strong><span>*</span></label>
                                            <select required className="shadow-sm form-select" name="classIn" onChange={registerDataChange} value={classIn}>
                                                <option></option>
                                                <option>BCA</option>
                                                <option>BCOM</option>
                                                <option>BBA</option>
                                                <option>BSC IT</option>
                                            </select>
                                        </div>
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="year" title="Year of Study"><strong>Year</strong><span>*</span></label>
                                            <select required className="shadow-sm form-select" name="year" onChange={registerDataChange} value={year}>
                                                <option ></option>
                                                <option >1st year</option>
                                                <option>2nd year</option>
                                                <option>3rd year</option>
                                                <option>Graduate</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="classRollNo" title="Class Roll No"><strong>Class Roll No</strong><span>*</span></label>
                                            <input required className="shadow-sm form-control p-sm-2 p-md-1" type="number" placeholder="Class Roll No" name="classRollNo" onChange={registerDataChange} value={classRollNo} title="Class Roll No" pattern="^[0-9]*$" minLength={3} maxLength={8} /></div>
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="universityRollno"><strong>University Roll No</strong><br /><span>*</span></label>
                                            <input required className="shadow-sm form-control p-sm-2 p-md-1" type="number" placeholder="Enter University Roll No" name="universityRollno" onChange={registerDataChange} value={universityRollno} minLength={4} maxLength={16} title="Enter University Roll No." pattern="^[0-9]*$" /></div>
                                    </div>
                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="class10" title="Class 10th"><strong>Class 10th</strong><span>*</span></label>
                                            <input required className="shadow-sm form-control p-sm-2 p-md-1" type="text" placeholder="92% or 9.2 CGPA" name="class10" onChange={registerDataChange} value={class10} title="Class 10th Marks" /></div>
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="class12"><strong>Class 12th</strong><br /><span>*</span></label>
                                            <input required className="form-control p-sm-2 p-md-1" type="text" placeholder="92% or 9.2 CGPA" name="class12" onChange={registerDataChange} value={class12} minLength={2} maxLength={8} title="Class 12th Marks" /></div>
                                    </div>


                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="graduation" title="Graduation Marks"><strong>Graduation (if Result Declared)</strong></label>
                                            <input required className="shadow-sm form-control p-sm-2 p-md-1" type="text" placeholder="Marks in Graduation" name="graduation" onChange={registerDataChange} value={graduation} title="Graduation Marks" /></div>
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="projects"><strong>Projects (if any)</strong><br /></label>
                                            <input className="form-control p-sm-2 p-md-1" type="text" placeholder="Projects If any" name="projects" onChange={registerDataChange} value={projects} title="Projects (if any)" /></div>
                                    </div>
                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="graduation" title="Graduation Marks"><strong>My Skills</strong></label>
                                            <input required className="shadow-sm form-control p-sm-2 p-md-1" type="text" placeholder="Enter Your Skills. Ex: ReactJs, MongoDB, Express, Node" name="skills" onChange={registerDataChange} value={skills} title="Skills" /></div>
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="projects"><strong>Date of Birth</strong><br /></label>
                                            <input className="form-control p-sm-2 p-md-1" type="date" placeholder="Projects If any" name="dateOfBirth" onChange={registerDataChange} value={dateOfBirth} title="Date of Birth" /></div>
                                    </div>
                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="graduation" title="Graduation Marks"><strong>Linked In Profile</strong></label>
                                            <input className="shadow-sm form-control p-sm-2 p-md-1" type="url" placeholder="LinkedIn Profile URL" name="linkedInURL" onChange={registerDataChange} value={linkedInURL} title="Linked In Profile URL" /></div>
                                        <div className="col-11 col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="projects"><strong>Social Link</strong><br /></label>
                                            <input className="form-control p-sm-2 p-md-1" type="url" placeholder="Github URL, Resume URL" name="socialLink" onChange={registerDataChange} value={socialLink} title="Social Link" /></div>
                                    </div>


                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-11 col-sm-12 col-lg-10 col-xl-10 col-xxl-10 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="about"><strong>About</strong><br /><span>*</span></label>
                                            <textarea required className="shadow-sm form-control p-sm-2 p-md-1" placeholder="Tell us About yourself in 80 To 350 Words" name="about" onChange={registerDataChange} value={about} minLength={80} maxLength={500} />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-11 col-sm-12 col-lg-10 col-xl-10 col-xxl-10 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="objective"><strong>Objective</strong><br /><span>*</span></label>
                                            <textarea required className="shadow-sm form-control p-sm-2 p-md-1" placeholder="Tell us about Objective" name="objective" onChange={registerDataChange} value={objective} minLength={80} maxLength={500} />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-center mb-2 p-sm-2 p-md-1">
                                        <div className="col-11 col-sm-12 col-lg-10 col-xl-10 col-xxl-10 text-start p-sm-2 p-md-1 mb-3 mb-sm-0">
                                            <label className="form-label p-sm-2 p-md-1 d-none d-sm-flex" htmlFor="experience"><strong>Experience (if any)</strong><br /></label>
                                            <textarea className="shadow-sm form-control p-sm-2 p-md-1" placeholder="Tell us about Experience" name="experience" onChange={registerDataChange} value={experience} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-center shadow-sm" style={{ padding: 8 }}>
                                        <button className="btn btn-outline-success text-uppercase fw-bold text-center shadow-sm" type="submit" style={{ width: '227.675px', borderRadius: 20, marginTop: 15, marginRight: 0, marginBottom: 10 }}>Update Profile</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }

        </Fragment>
    );
};

export default UpdateProfileComponent;