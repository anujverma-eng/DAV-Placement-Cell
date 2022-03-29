import {
    APPLY_JOB_REQUEST, APPLY_JOB_SUCCESS, APPLY_JOB_FAIL, ADD_TO_JOB_APPLIED,
    CLEAR_ERRORS
} from "../constants/jobAppliedConstants";

export const addToAppliedReducer = (state = { appliedJobs: [] }, action) => {

    switch (action.type) {
        case ADD_TO_JOB_APPLIED:
            const item = action.payload;

            const jobExist = state.appliedJobs.find((element) =>
                element.job === item.job
            );

            if (jobExist) {
                return {
                    ...state,
                    appliedJobs: state.appliedJobs.map((i) =>
                        i.job === jobExist.job ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    appliedJobs: [...state.appliedJobs, item],
                };
            }


        default:
            return state;
    }

};

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