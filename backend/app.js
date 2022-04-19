const express = require('express');
const path = require("path");
const jobRoute = require('./routes/jobRoute');
const studentRoute = require('./routes/studentRoute');
const jobAppliedRoute = require('./routes/jobAppliedRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "backend/config/config.env" });
}

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

//Import All Routes
app.use("/api/v1", jobRoute);
app.use("/api/v1", studentRoute);
app.use("/api/v1", jobAppliedRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware for Error
app.use(errorMiddleware);
module.exports = app;