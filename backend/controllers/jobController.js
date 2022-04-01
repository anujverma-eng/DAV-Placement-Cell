const Job = require('../models/jobsModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');


// Create New Job
exports.createJob = catchAsyncErrors(async (req, res, next) => {


    const job = await Job.create(req.body);

    res.status(201).json({
        success: true,
        job
    });

});


//Get All Jobs -- By Admin only
exports.getAllJobs = catchAsyncErrors(async (req, res) => {

    // Filter for Eligibility : either BCOM / BCA or any other
    // Search for any keyword for company Name
    // const resultPerPage = 50;
    const jobsCount = await Job.countDocuments();

    const apiFeature = new ApiFeatures(Job.find(), req.query)
        .search()
        .filter()
        .eligibilityOR()
        .classOR()
        .jobTypeOR();
    // .pagination(resultPerPage);
    const jobs = await apiFeature.query;

    res.status(200).json({
        success: true,
        jobsCount,
        jobs
    });
});

// Update JOB -- By Admin only
exports.updateJob = catchAsyncErrors(async (req, res, next) => {

    let job = await Job.findById(req.params.id);

    if (!job) {
        return rs(new ErrorHandler("Job Not Found", 404));
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });

    res.status(200).json({
        success: true,
        job
    });

});

//Delete Job -- By Admin only

exports.deleteJob = catchAsyncErrors(async (req, res, next) => {

    const job = await Job.findById(req.params.id);

    if (!job) {
        return rs(new ErrorHandler("Job Not Found", 404));
    }

    await job.remove();

    res.status(200).json({
        success: true,
        message: "Job Deleted Successfully"
    });

});

//Get Single Job 

exports.getJobDetails = catchAsyncErrors(async (req, res, next) => {

    const job = await Job.findById(req.params.id);

    if (!job) {
        return rs(new ErrorHandler("Job Not Found", 404));
    }


    res.status(200).json({
        success: true,
        job
    });

});

exports.getEligibleJobs = catchAsyncErrors(async (req, res) => {
    // const resultPerPage = 8;
    const jobsCount = await Job.countDocuments();

    req.query.class = [req.student.classIn];
    req.query.approve_reject = ['Approved'];
    const apiFeature = new ApiFeatures(Job.find({ lastDateToApply: { $gte: new Date() } }).sort({ lastDateToApply: 1 }), req.query)
        .search()
        .filter()
        .eligibilityOR()
        .classOR()
        .jobTypeOR()
        .isApprovedJob();
    // .pagination(resultPerPage);
    const jobs = await apiFeature.query;

    // const jobs = await Job.find({ "class": req.student.classIn });

    res.status(200).json({
        success: true,
        jobsCount,
        jobs
    });
});
