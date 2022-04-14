const express = require('express');
const { getAllJobs, createJob, updateJob, deleteJob, getJobDetails, getEligibleJobs } = require('../controllers/jobController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();


router.route("/jobs/new").post(createJob);

// router.route("/jobs").get(isAuthenticatedUser, authorizeRoles("admin"), getAllJobs);
router.route("/jobs").get(getAllJobs);

router.route("/eligible/jobs").get(isAuthenticatedUser, authorizeRoles('student', 'admin'), getEligibleJobs);

router.route("/admin/job/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateJob)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteJob);

// router.route("/job/:id").get(isAuthenticatedUser, authorizeRoles("admin", "student"), getJobDetails);
router.route("/job/:id").get(getJobDetails);


module.exports = router;