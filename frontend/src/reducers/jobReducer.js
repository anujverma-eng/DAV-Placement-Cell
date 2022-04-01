import {
    ALL_JOB_REQUEST, ALL_JOB_SUCCESS, ALL_JOB_FAIL, CLEAR_ERRORS,
    JOB_DETAILS_REQUEST, JOB_DETAILS_SUCCESS, JOB_DETAILS_FAIL,
    CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS, CREATE_JOB_FAIL,
    ADMIN_JOB_REQUEST, ADMIN_JOB_SUCCESS, ADMIN_JOB_FAIL,
    ADMIN_DELETE_JOB_REQUEST, ADMIN_DELETE_JOB_SUCCESS, ADMIN_DELETE_JOB_FAIL, ADMIN_DELETE_JOB_RESET,
    ADMIN_UPDATE_JOB_REQUEST, ADMIN_UPDATE_JOB_SUCCESS, ADMIN_UPDATE_JOB_FAIL
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

export const adminJobReducer = ((state = { jobs: [] }, action) => {
    switch (action.type) {
        case ADMIN_JOB_REQUEST:
            return {
                loading: true,
                jobs: []
            };
        case ADMIN_JOB_SUCCESS:
            return {
                loading: false,
                jobs: action.payload.jobs,
                jobsCount: action.payload.jobsCount
            };
        case ADMIN_JOB_FAIL:
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

export const adminDeleteUpdateJobReducer = ((state = {}, action) => {
    switch (action.type) {
        case ADMIN_DELETE_JOB_REQUEST:
        case ADMIN_UPDATE_JOB_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADMIN_DELETE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case ADMIN_UPDATE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case ADMIN_DELETE_JOB_FAIL:
        case ADMIN_UPDATE_JOB_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADMIN_DELETE_JOB_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false
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