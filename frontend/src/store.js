import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { adminDeleteUpdateJobReducer, adminJobReducer, jobDetailsReducer, jobReducer } from './reducers/jobReducer';
import { adminStudentDetailsReducer, adminStudentsReducer, forgotPasswordReducer, studentReducer, updateStudentProfileReducer } from './reducers/studentReducer';
import { applyToNewJobReducer, myAppliedReducer } from './reducers/appliedReducer';

const reducer = combineReducers({
    jobReducer: jobReducer,
    jobDetailsReducer: jobDetailsReducer,
    studentReducer: studentReducer,
    updateStudentProfileReducer: updateStudentProfileReducer,
    forgotPasswordReducer: forgotPasswordReducer,
    applyToNewJobReducer: applyToNewJobReducer,
    myAppliedReducer: myAppliedReducer,
    adminJobReducer: adminJobReducer,
    adminDeleteUpdateJobReducer: adminDeleteUpdateJobReducer,
    adminStudentsReducer: adminStudentsReducer,
    adminStudentDetailsReducer: adminStudentDetailsReducer,

});

const initialState = {};


const middleWare = [thunk,];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;