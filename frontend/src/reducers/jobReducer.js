import {
    ALL_JOB_REQUEST, ALL_JOB_SUCCESS, ALL_JOB_FAIL, CLEAR_ERRORS,
    JOB_DETAILS_REQUEST, JOB_DETAILS_SUCCESS, JOB_DETAILS_FAIL,
    CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS, CREATE_JOB_FAIL
} from "../constants/jobConstants";

export const jobReducer = ((state = { jobs: [] }, action) => {
    switch (action.type) {
        case ALL_JOB_REQUEST:
            return {
                loading: true,
                jobs: []
            };
        case ALL_JOB_SUCCESS:
            return {
                loading: false,
                jobs: action.payload.jobs,
                jobsCount: action.payload.jobsCount
            };
        case ALL_JOB_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
});
export const jobDetailsReducer = ((state = { job: {} }, action) => {
    switch (action.type) {
        case JOB_DETAILS_REQUEST:
        case CREATE_JOB_REQUEST:
            return {
                loading: true,
                ...state
            };
        case JOB_DETAILS_SUCCESS:
        case CREATE_JOB_SUCCESS:
            return {
                loading: false,
                job: action.payload.job
            };
        case JOB_DETAILS_FAIL:
        case CREATE_JOB_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
});