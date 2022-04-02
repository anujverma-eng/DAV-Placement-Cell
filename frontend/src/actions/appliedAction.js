import {
    APPLY_JOB_REQUEST, APPLY_JOB_SUCCESS, APPLY_JOB_FAIL,
    CLEAR_ERRORS, MY_APPLIED_REQUEST, MY_APPLIED_SUCCESS, MY_APPLIED_FAIL,
    ADMIN_ALL_APPLIED_REQUEST, ADMIN_ALL_APPLIED_SUCCESS, ADMIN_ALL_APPLIED_FAIL,
    ADMIN_UPDATE_APPLIED_REQUEST, ADMIN_UPDATE_APPLIED_SUCCESS, ADMIN_UPDATE_APPLIED_FAIL,
    ADMIN_DELETE_APPLIED_REQUEST, ADMIN_DELETE_APPLIED_SUCCESS, ADMIN_DELETE_APPLIED_FAIL, ADMIN_DELETE_APPLIED_RESET
} from "../constants/jobAppliedConstants";
import axios from 'axios';


export const newJobApplied = (appliedJobs) => async (dispatch) => {
    try {
        dispatch({ type: APPLY_JOB_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/v1/jobApplied/new`, { appliedJobs }, config);

        dispatch({
            type: APPLY_JOB_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: APPLY_JOB_FAIL,
            payload: error.response.data.message
        });
    }

};
export const myApplied = () => async (dispatch) => {
    try {
        dispatch({ type: MY_APPLIED_REQUEST });

        const { data } = await axios.get(`/api/v1/myApplied`);

        dispatch({
            type: MY_APPLIED_SUCCESS,
            payload: data.jobApplied
        });

    } catch (error) {
        dispatch({
            type: MY_APPLIED_FAIL,
            payload: error.response.data.message
        });
    }

};

export const getAllAppliedAdmin = (keyword) => async (dispatch) => {
    try {

        dispatch({
            type: ADMIN_ALL_APPLIED_REQUEST
        });
        let link = `/api/v1/admin/jobApplied`;
        if (keyword) {
            link = `/api/v1/admin/jobApplied?interviewStatus=${keyword}`;
        }
        const { data } = await axios.get(link);


        dispatch({
            type: ADMIN_ALL_APPLIED_SUCCESS,
            payload: data
        });


    } catch (error) {
        dispatch({
            type: ADMIN_ALL_APPLIED_FAIL,
            payload: error.response.data.message
        });
    }
};

export const updateJobApplied = (id, interviewStatus) => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_UPDATE_APPLIED_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/admin/jobApplied/${id}`, { interviewStatus }, config);
        dispatch({ type: ADMIN_UPDATE_APPLIED_SUCCESS, payload: data.success });

    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_APPLIED_FAIL,
            payload: error.response.data.message
        });
    }
};

export const deleteJobApplied = (id) => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_DELETE_APPLIED_REQUEST });

        if (!id) {
            console.log("Please Enter Job Id to Delete");
            return;
        }

        const { data } = await axios.delete(`/api/v1/admin/jobApplied/${id}`);
        dispatch({ type: ADMIN_DELETE_APPLIED_SUCCESS, payload: data.success });

    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_APPLIED_FAIL,
            payload: error.response.data.message
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};