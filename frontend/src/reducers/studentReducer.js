import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, REGISTER_STUDENT_REQUEST, REGISTER_STUDENT_SUCCESS,
    REGISTER_STUDENT_FAIL, LOAD_STUDENT_REQUEST, LOAD_STUDENT_SUCCESS, LOAD_STUDENT_FAIL,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_RESET, UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    ADMIN_ALL_STUDENTS_REQUEST, ADMIN_ALL_STUDENTS_SUCCESS, ADMIN_ALL_STUDENTS_FAIL,
    ADMIN_STUDENT_DETAILS_REQUEST, ADMIN_STUDENT_DETAILS_SUCCESS, ADMIN_STUDENT_DETAILS_FAIL,
    DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, DELETE_PROFILE_FAIL
} from "../constants/studentConstants";

export const studentReducer = ((state = { student: {} }, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_STUDENT_REQUEST:
        case LOAD_STUDENT_REQUEST:
        case LOGOUT_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_STUDENT_SUCCESS:
        case LOAD_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                student: action.payload
            };
        case LOGIN_FAIL:
        case REGISTER_STUDENT_FAIL:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                student: null,
                error: action.payload
            };
        case LOAD_STUDENT_FAIL:
        case LOGOUT_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                student: null,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }

});
export const updateStudentProfileReducer = ((state = {}, action) => {

    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case DELETE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_PROFILE_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case DELETE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }

});

export const forgotPasswordReducer = ((state = {}, action) => {

    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }

});


export const adminStudentsReducer = ((state = { students: [] }, action) => {
    switch (action.type) {
        case ADMIN_ALL_STUDENTS_REQUEST:
            return {
                loading: true,
                students: []
            };
        case ADMIN_ALL_STUDENTS_SUCCESS:
            return {
                loading: false,
                students: action.payload.students,
                studentsCount: action.payload.studentsCount
            };
        case ADMIN_ALL_STUDENTS_FAIL:
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

export const adminStudentDetailsReducer = ((state = { student: {} }, action) => {
    switch (action.type) {
        case ADMIN_STUDENT_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case ADMIN_STUDENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                student: action.payload
            };
        case ADMIN_STUDENT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                student: null,
                error: action.payload
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