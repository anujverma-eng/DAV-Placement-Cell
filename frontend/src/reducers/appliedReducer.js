import {
APPLY_JOB_REQUEST, APPLY_JOB_SUCCESS, APPLY_JOB_FAIL,
    CLEAR_ERRORS, MY_APPLIED_REQUEST, MY_APPLIED_SUCCESS, MY_APPLIED_FAIL
} from "../constants/jobAppliedConstants";



export const applyToNewJobReducer = (state = {}, action) => {
    switch (action.type) {
        case APPLY_JOB_REQUEST:
            return {
                ...state,
                loading: true,
                message: "loading"
            };
        case APPLY_JOB_SUCCESS:
            return {
                loading: false,
                jobApplied: action.payload,
                message: "Job Success"
            };
        case APPLY_JOB_FAIL:
            return {
                loading: false,
                error: action.payload,
                message: "You have already applied"
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                message: null,
            };
        default:
            return state;
    }
};


export const myAppliedReducer = (state = { applied: [] }, action) => {
    switch (action.type) {
        case MY_APPLIED_REQUEST:
            return {
                loading: true,
            };
        case MY_APPLIED_SUCCESS:
            return {
                loading: false,
                jobApplied: action.payload,
            };
        case MY_APPLIED_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};