import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, REGISTER_STUDENT_REQUEST, REGISTER_STUDENT_SUCCESS,
    REGISTER_STUDENT_FAIL, LOAD_STUDENT_REQUEST, LOAD_STUDENT_SUCCESS, LOAD_STUDENT_FAIL,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
} from "../constants/studentConstants";
import axios from 'axios';
import { getAllJobs } from "./jobAction";


export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/v1/login`, { email, password }, config);
        dispatch({ type: LOGIN_SUCCESS, payload: data.student });

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        });
    }
};

export const registerStudent = (myForm) => async (dispatch) => {

    try {
        dispatch({ type: REGISTER_STUDENT_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`/api/v1/register`, myForm, config);
        dispatch({ type: REGISTER_STUDENT_SUCCESS, payload: data.student });

    } catch (error) {
        dispatch({
            type: REGISTER_STUDENT_FAIL,
            payload: error.response.data.message
        });
    }
};

// Load Student
export const loadStudent = () => async (dispatch) => {

    try {
        dispatch({ type: LOAD_STUDENT_REQUEST });

        const { data } = await axios.get(`/api/v1/me`);
        dispatch({ type: LOAD_STUDENT_SUCCESS, payload: data.student });

        dispatch(getAllJobs(true));

    } catch (error) {
        dispatch({
            type: LOAD_STUDENT_FAIL,
            payload: error.response.data.message
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_REQUEST });

        const { data } = await axios.get(`/api/v1/logout`);

        dispatch({ type: LOGOUT_SUCCESS, payload: data.message });

        dispatch(getAllJobs(false));

    } catch (error) {

        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        });
    }
};

export const updateStudentProfile = (studentData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.put(`/api/v1/me/update`, studentData, config);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        });
    }
};

export const updateStudentPassword = (passwords) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/password/update`, passwords, config);
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/v1/password/forgot`, { email }, config);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }

};
export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, { password, confirmPassword }, config);

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }

};


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};