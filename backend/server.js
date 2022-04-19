const app = require('./app');
// const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connectDB = require('./config/database');

if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "backend/config/config.env" });
}

// Handling Uncaught Exception 
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting Down the Server due to Uncaught Exception");
    process.exit(1);
});

//Connecting with database
connectDB();

// use cloudinary after connecting to db
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection --- like if your DB_URI is incorrect
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting Down the Server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});