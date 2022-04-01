import axios from 'axios';
import {
    ALL_JOB_REQUEST, ALL_JOB_SUCCESS, ALL_JOB_FAIL, CLEAR_ERRORS, JOB_DETAILS_REQUEST, JOB_DETAILS_SUCCESS, JOB_DETAILS_FAIL,
    CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS, CREATE_JOB_FAIL,
    ADMIN_JOB_REQUEST, ADMIN_JOB_SUCCESS, ADMIN_JOB_FAIL,
    ADMIN_DELETE_JOB_REQUEST, ADMIN_DELETE_JOB_SUCCESS, ADMIN_DELETE_JOB_FAIL,
    ADMIN_UPDATE_JOB_REQUEST, ADMIN_UPDATE_JOB_SUCCESS, ADMIN_UPDATE_JOB_FAIL
} from "../constants/jobConstants";

export const getAllJobs = (isAuthenticated) => async (dispatch) => {
    try {

        dispatch({
            type: ALL_JOB_REQUEST
        });

        if (isAuthenticated) {
            const { data } = await axios.get("/api/v1/eligible/jobs");
            dispatch({
                type: ALL_JOB_SUCCESS,
                payload: data
            });
        } else {
            const { data } = await axios.get("/api/v1/jobs?approve_reject=Approved");

            dispatch({
                type: ALL_JOB_SUCCESS,
                payload: data
            });
        }


    } catch (error) {
        dispatch({
            type: ALL_JOB_FAIL,
            payload: error.response.data.message
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

export const getJobDetails = (id) => async (dispatch) => {
    try {

        dispatch({
            type: JOB_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/job/${id}`);

        dispatch({
            type: JOB_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: JOB_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
};

export const createNewJob = (companyName, companyEmail, companyContactPerson, contactPersonPhone, CompanyWebsite,
    companyAddress, companyAbout, jobRole, candidatesRequired, jobDescription,
    skillsRequired, lastDateToApply, salaryPM, additionalDetails,
    docsRequiredAtInterview, docsRequiredAtJoining, eligibilityArray, classArray,
    jobTypeArray, salaryTypeArray) => async (dispatch) => {
        try {
            dispatch({ type: CREATE_JOB_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };
            console.log(eligibilityArray);
            const { data } = await axios.post(`/api/v1/jobs/new`, {
                companyName, companyEmail, companyContactPerson, contactPersonPhone, CompanyWebsite,
                companyAddress, companyAbout, jobRole, candidatesRequired, jobDescription,
                skillsRequired, lastDateToApply, salaryPM, additionalDetails,
                docsRequiredAtInterview, docsRequiredAtJoining, eligibility: [...eligibilityArray], class: [...classArray],
                jobType: [...jobTypeArray], salaryType: [...salaryTypeArray]
            }, config);

            dispatch({
                type: CREATE_JOB_SUCCESS,
                payload: data.job
            });


        } catch (error) {
            dispatch({
                type: CREATE_JOB_FAIL,
                payload: error.response.data.message
            });
        }
    };

// For Admin
export const getAdminJobs = (keyword, mustDelete) => async (dispatch) => {
    try {

        dispatch({
            type: ADMIN_JOB_REQUEST
        });
        let link = `/api/v1/jobs?approve_reject=${keyword}`;
        if (mustDelete) {
            link = `/api/v1/jobs?approve_reject=${keyword}&lastDateToApply[lt]=${Date.now()}`;
        }
        if (keyword === false && mustDelete) {
            link = `/api/v1/jobs?lastDateToApply[lt]=${Date.now()}`;

        }
        const { data } = await axios.get(link);

        dispatch({
            type: ADMIN_JOB_SUCCESS,
            payload: data
        });


    } catch (error) {
        dispatch({
            type: ADMIN_JOB_FAIL,
            payload: error.response.data.message
        });
    }
};

export const deleteJob = (id) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_DELETE_JOB_REQUEST });

        if (!id) {
            console.log("Please Enter Job Id to Delete");
            return;
        }
        const { data } = await axios.delete(`/api/v1/admin/job/${id}`);

        dispatch({
            type: ADMIN_DELETE_JOB_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_JOB_FAIL,
            payload: error.response.data.message
        });
    }
};

export const fewUpdatesInJob = (id, status, lastDateToApply, whatsappLink) => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_UPDATE_JOB_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/admin/job/${id}`, { approve_reject: status, lastDateToApply, whatsappLink }, config);
        dispatch({ type: ADMIN_UPDATE_JOB_SUCCESS, payload: data.success });

    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_JOB_FAIL,
            payload: error.response.data.message
        });
    }
};