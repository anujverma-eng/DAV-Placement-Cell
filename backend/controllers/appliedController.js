const JobApplied = require('../models/appliedModel');
const Job = require('../models/jobsModel');
const Student = require('../models/studentModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');
const mongoose = require('mongoose');

// Apply for a JOb
exports.newJobApply = catchAsyncErrors(async (req, res, next) => {

    const { appliedJobs } = req.body;

    const whoApplied = await JobApplied.find({ appliedJobs: { $elemMatch: { job: mongoose.Types.ObjectId(appliedJobs.job) } } });
    let isApplied = false;
    if (whoApplied) {
        isApplied = whoApplied.map((element) => {
            if (element.student.toString() === req.student._id.toString()) {
                return true;
            } else {
                return false;
            }
        });
    }

    if (isApplied.includes(true)) {
        return next(new ErrorHandler("You Have Already Applied", 404));
    }

    const jobApplied = await JobApplied.create({
        appliedJobs,
        student: req.student._id,
        appliedAt: Date.now()
    });

    res.status(201).json({
        success: true,
        jobApplied,
    });

});

exports.whoAppliedOnThisJob = catchAsyncErrors(async (req, res, next) => {

    // db.jobapplieds.find({appliedJobs:{$elemMatch:{job:ObjectId("6232e02ca8c43195efc7af55")}}})

    const jobApplied = await JobApplied.find({ appliedJobs: { $elemMatch: { job: mongoose.Types.ObjectId(req.params.id) } } });

    res.status(200).json({
        success: true,
        jobApplied
    });
});

exports.getJobsWhereIHaveApplied = catchAsyncErrors(async (req, res, next) => {

    const jobApplied = await JobApplied.find({ student: mongoose.Types.ObjectId(req.params.id) });
    res.status(200).json({
        success: true,
        jobApplied
    });



});

exports.getSingleApplied = catchAsyncErrors(async (req, res, next) => {

    const jobApplied = await JobApplied.findById(req.params.id).populate("student", "name email classIn year");

    res.status(200).json({
        success: true,
        jobApplied
    });

});

// My Job Applied
exports.getMyApplied = catchAsyncErrors(async (req, res, next) => {

    const jobApplied = await JobApplied.find({ student: req.student._id }).populate({ path: 'appliedJobs.job', select: 'companyName jobType salaryPM lastDateToApply whatsappLink' });
    if (!jobApplied) {
        return next(new ErrorHandler("No Job Applied with this id", 404));
    }

    res.status(200).json({
        success: true,
        jobApplied
    });

});

// get all applied
exports.getAllApplied = catchAsyncErrors(async (req, res, next) => {

    const jobApplied = await JobApplied.find();

    res.status(200).json({
        success: true,
        jobApplied
    });
});

// Update Applied
exports.updateApplied = catchAsyncErrors(async (req, res, next) => {

    const jobApplied = await JobApplied.findById(req.params.id);

    if (!jobApplied) {
        return next(new ErrorHandler("Nothing Found", 400));
    }

    if (jobApplied.interviewStatus === 'Selected') {
        return next(new ErrorHandler("The Student is Already Selected", 400));
    }

    jobApplied.interviewStatus = req.body.interviewStatus;

    await jobApplied.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Delete Applied
exports.deleteApplied = catchAsyncErrors(async (req, res, next) => {

    const jobApplied = await JobApplied.findById(req.params.id);

    if (!jobApplied) {
        return next(new ErrorHandler("Nothing Found", 400));
    }
    await jobApplied.remove();

    res.status(200).json({
        success: true,
    });
});