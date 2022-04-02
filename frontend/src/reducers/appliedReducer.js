import {
    APPLY_JOB_REQUEST, APPLY_JOB_SUCCESS, APPLY_JOB_FAIL,
    CLEAR_ERRORS, MY_APPLIED_REQUEST, MY_APPLIED_SUCCESS, MY_APPLIED_FAIL,
    ADMIN_ALL_APPLIED_REQUEST, ADMIN_ALL_APPLIED_SUCCESS, ADMIN_ALL_APPLIED_FAIL,
    ADMIN_UPDATE_APPLIED_REQUEST, ADMIN_UPDATE_APPLIED_SUCCESS, ADMIN_UPDATE_APPLIED_FAIL,
    ADMIN_DELETE_APPLIED_REQUEST, ADMIN_DELETE_APPLIED_SUCCESS, ADMIN_DELETE_APPLIED_FAIL, ADMIN_DELETE_APPLIED_RESET, ADMIN_JOB_WHO_APPLIED_REQUEST, ADMIN_JOB_WHO_APPLIED_SUCCESS, ADMIN_JOB_WHO_APPLIED_FAIL
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

export const adminAllAppliedReducer = ((state = { jobApplied: [] }, action) => {
    switch (action.type) {
        case ADMIN_ALL_APPLIED_REQUEST:
        case ADMIN_JOB_WHO_APPLIED_REQUEST:
            return {
                loading: true,
                jobApplied: []
            };
        case ADMIN_ALL_APPLIED_SUCCESS:
        case ADMIN_JOB_WHO_APPLIED_SUCCESS:
            return {
                loading: false,
                jobApplied: action.payload.jobApplied,

            };
        case ADMIN_ALL_APPLIED_FAIL:
        case ADMIN_JOB_WHO_APPLIED_FAIL:
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

export const adminDeleteUpdateJobAppliedReducer = ((state = {}, action) => {
    switch (action.type) {
        case ADMIN_UPDATE_APPLIED_REQUEST:
        case ADMIN_DELETE_APPLIED_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADMIN_DELETE_APPLIED_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case ADMIN_UPDATE_APPLIED_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case ADMIN_DELETE_APPLIED_FAIL:
        case ADMIN_UPDATE_APPLIED_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADMIN_DELETE_APPLIED_RESET:
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