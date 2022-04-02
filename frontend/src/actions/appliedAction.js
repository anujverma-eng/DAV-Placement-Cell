import {
    APPLY_JOB_REQUEST, APPLY_JOB_SUCCESS, APPLY_JOB_FAIL,
    CLEAR_ERRORS, MY_APPLIED_REQUEST, MY_APPLIED_SUCCESS, MY_APPLIED_FAIL
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



// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};