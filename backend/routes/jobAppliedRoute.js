const express = require('express');
const { newJobApply, whoAppliedOnThisJob, getJobsWhereIHaveApplied, getSingleApplied, getMyApplied, getAllApplied, updateApplied, deleteApplied } = require('../controllers/appliedController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router.route('/jobApplied/new').post(isAuthenticatedUser, newJobApply);

router.route('/jobApplied/job/:id').get(isAuthenticatedUser, whoAppliedOnThisJob);

// router.route('/jobApplied/me/:id').get(isAuthenticatedUser, getJobsWhereIHaveApplied);

router.route('/jobApplied/:id').get(isAuthenticatedUser, getSingleApplied);

router.route('/myApplied').get(isAuthenticatedUser, getMyApplied);

// Only Admin
router.route('/admin/jobApplied').get(isAuthenticatedUser, authorizeRoles('admin'), getAllApplied);

router.route('/admin/jobApplied/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateApplied)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteApplied);

module.exports = router;