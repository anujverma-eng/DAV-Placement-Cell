const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Student = require('../models/studentModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require("cloudinary");

// Register  Student

exports.registerStudent = catchAsyncErrors(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 200,
        height: 200,
        crop: "fill",
        gravity: "face"
    });
    const { firstName,
        lastName,
        email,
        phone,
        password,
        fathersName,
        classIn,
        year,
        classRollNo,
        universityRollno,
        class10,
        class12,
        graduation,
        projects,
        about,
        objective,
        experience,
        dateOfBirth,
        skills,
        linkedInURL,
        socialLink,
        address } = req.body;


    const student = await Student.create({
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        firstName,
        lastName,
        email,
        phone,
        password,
        fathersName,
        address,
        classIn,
        year,
        classRollNo,
        universityRollno,
        class10,
        class12,
        graduation,
        projects,
        about,
        objective,
        experience,
        dateOfBirth,
        skills,
        linkedInURL,
        socialLink,
        address
    });

    try {
        await sendEmail({
            email: student.email,
            subject: `D.A.V. College, Jalandhar, Placement Cell`,
            message: `Dear ${student.firstName} ${student.lastName}, \nThank you for Registering with D.A.V. College, Jalandhar Placement Cell`,
        });
    } catch (error) {
        console.log(error.message);
    }

    sendToken(student, 201, res);

});

// Login Student

exports.loginStudent = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    // check if the student has given both email and password or not
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    const student = await Student.findOne({ email }).select("+password");

    if (!student) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatch = await student.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(student, 200, res);


});

// Logout Student 
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    });


});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findOne({ email: req.body.email });
    if (!student) {
        return next(new ErrorHandler("student Not Found", 404));
    }

    // Get Reset Password token
    const resetToken = student.getResetPasswordToken();

    await student.save({ validateBeforeSave: false });


    // Create Link for Forgot password

    //! below is for -- production
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    //!below is for -- development
    const resetPasswordUrl = `${req.protocol}://${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `D.A.V. College, Jalandhar \n Placement Cell \n your reset password link: \n\n ${resetPasswordUrl} \n \n If you have not requested this email then please ignore it`;

    try {
        await sendEmail({
            email: student.email,
            subject: `D.A.V. College, Jalandhar, Placement Cell`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${student.email} successfully`
        });
    } catch (err) {
        student.resetPasswordToken = undefined;
        student.resetPasswordExpire = undefined;
        await student.save({ validateBeforeSave: false });

        return next(new ErrorHandler(err.message, 500));
    }

});


// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //  Creating Token Hash  
    const resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    //  Now Search the Token in our database
    const student = await Student.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!student) {
        return next(new ErrorHandler("Reset Password Token is Invalid or has been Expired", 400));
    };

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password Does not Matched", 400));
    }

    //  Now the student has updated the Password, and we also need to update it in our database
    student.password = req.body.password;


    student.resetPasswordToken = undefined;
    student.resetPasswordExpire = undefined;

    await student.save();

    sendToken(student, 200, res);

});

// Get User Details
exports.getStudentMEDetails = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.student.id);

    res.status(200).json({
        success: true,
        student
    });


});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.student.id).select("+password");

    const isPasswordMatch = await student.comparePassword(req.body.oldPassword);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Password Incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password Does not Matched", 400));
    }

    student.password = req.body.newPassword;

    await student.save();

    sendToken(student, 200, res);
});

// Update Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const {
        firstName,
        lastName,
        email,
        phone,
        fathersName,
        classIn,
        year,
        classRollNo,
        universityRollno,
        class10,
        class12,
        graduation,
        projects,
        about,
        objective,
        experience,
        dateOfBirth,
        skills,
        linkedInURL,
        socialLink,
        address
    } = req.body;

    const newStudentData = {
        firstName,
        lastName,
        email,
        phone,
        fathersName,
        classIn,
        year,
        classRollNo,
        universityRollno,
        class10,
        class12,
        graduation,
        projects,
        about,
        objective,
        experience,
        dateOfBirth,
        skills,
        linkedInURL,
        socialLink,
        address
    };
    if (req.body.avatar !== "undefined") {
        const student = await Student.findById(req.student.id);

        const imgID = student.avatar.public_id;

        try {
            await cloudinary.v2.uploader.destroy(imgID);
        } catch (error) {
            console.log(error.message);
        }

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 200,
            height: 200,
            crop: "fill",
            gravity: "face"
        });

        try {
            newStudentData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        } catch (error) {
            console.log(error.message);
            newStudentData.avatar = {
                public_id: "myCloud.public_id",
                url: "myCloud.secure_url",
            };
        }
    }

    const student = await Student.findByIdAndUpdate(req.student.id, newStudentData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });

});

// Get All Student -- Admin
exports.getAllStudent = catchAsyncErrors(async (req, res, next) => {
    const students = await Student.find();
    const studentsCount = await Student.countDocuments();

    res.status(200).json({
        success: true,
        students,
        studentsCount
    });

});

// Get Student Detail -- Admin
exports.getStudentDetails = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id);

    if (!student) {
        return next(new ErrorHandler("Student Does Not Exists", 400));
    }

    res.status(200).json({
        success: true,
        student
    });

});

// Update Profile -- Admin
exports.updateRoles = catchAsyncErrors(async (req, res, next) => {

    // const { name, email, classIn, year, fathersName,phone,alternativePhone, class10, class12, graduation, about,objective, experience,projects, classRollNo, universityRollno } = req.body;

    // const newStudentData = {
    //     name, email, classIn, year, fathersName,
    //     phone,alternativePhone, class10, class12,
    //     graduation, about,objective, experience,
    //     projects, classRollNo, universityRollno
    // };

    // Requested from Params not from students stored data in request
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        student
    });

});

// Delete Student -- Admin

exports.deleteStudent = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.params.id);

    if (!student) {
        return next(new ErrorHandler("Student Does not exits", 400));
    }

    await student.remove();

    res.status(200).json({
        success: true,
        message: "Student Deleted Successfully"
    });

});

//new for pull request