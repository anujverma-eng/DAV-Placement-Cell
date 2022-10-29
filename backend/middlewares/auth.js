const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwtToken = require('jsonwebtoken');
const Student = require('../models/studentModel');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Pls Login to Continue", 401));
    }

    const decodedData = jwtToken.verify(token, process.env.JWT_SECRET);

    req.student = await Student.findById(decodedData.id);
    next();

});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.student.role)) {
            return next(new ErrorHandler(`Roles: ${req.student.role} is not allowed to access this resource`, 403));
        }

        next();

    };
};  