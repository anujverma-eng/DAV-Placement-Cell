import {
    APPLY_JOB_REQUEST, APPLY_JOB_SUCCESS, APPLY_JOB_FAIL,
    CLEAR_ERRORS, ADD_TO_JOB_APPLIED
} from "../constants/jobAppliedConstants";
import axios from 'axios';


export const addToJobApplied = (id) => async (dispatch, getState) => {

    dispatch({
        type: ADD_TO_JOB_APPLIED,
        payload: {
            job: id,
        }
    });

    localStorage.setItem("appliedJobs", JSON.stringify(getState().addToAppliedReducer.appliedJobs));
};

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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};