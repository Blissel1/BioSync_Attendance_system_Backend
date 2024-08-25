import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../models/adminSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import { Attendance } from "../models/attendancestudent.js";
// import {Student} from '../models/studentSchema.js'
const JWT_SECRET="something"
const secret = JWT_SECRET;
console.log(secret);

const generateToken = (id) => {
  return jwt.sign(id,JWT_SECRET, { expiresIn: "1h" });
};

export const adminRegister = async (req, res, next) => {
  console.log(req.body);

  const { email, password, fullName } = req.body;
  try {
    const admin = await Admin.create({ email, password, fullName });
    const token = generateToken(admin._id);
    // const admin = {email, password, fullName}
    // const admin = {email, password, fullName}
    if (!email || !password || !fullName) {
      handleValidationError("Please fill the form!", 400);
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res;
      // .status(400)

      // .json(
      //   {
      //     success: false,
      //     message: "Admin already exists",
      //   },
      existingAdmin;
      // );
    }

    // const admin = await Admin.create({ email, password, fullName });
    // const token = generateToken(admin._id);

    res.status(201).json(
      {
        success: true,
        message: "Admin Created!",
        token: token,
        admin_id: admin._id,
      },
      admin._id
    );
  } catch (err) {
    next(err);
  }
};

export const adminSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      handleValidationError("Please provide email and password", 400);
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not registered" });
    }

    // const isMatch = await bcrypt.compare(password, admin.password);
    // if (!isMatch) {
    //   return res
    //     .status(401)
    //     .json({ success: false, message: "Invalid password" });
    // }

    const token = generateToken(admin._id);
    console.log(token);

    res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const admin = await Admin.find();
    res.status(200).json({
      success: true,
      admin,
    });
  } catch (err) {
    next(err);
  }
};

// const Attendance = require('../models/attendancestudent');
// const Student = require('../models/studentSchema');

// Fetch attendance data based on course, program, and year
export const getAttendanceData = async (req, res) => {
  const { courseName, program, year } = req.query;

  try {
    // Fetch attendance data for the specified course, program, and year
    const attendanceData = await Attendance.find({ courseName })
      .populate({
        path: "studentId",
        match: { program, year },
        select: "name indexNumber", // Fetch only the name and indexNumber fields
      })
      .sort({ "studentId.indexNumber": 1 }); // Sort by indexNumber in ascending order

    // If no data is found, return a 404 response
    if (!attendanceData || attendanceData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No attendance data found for the specified criteria.",
      });
    }

    // Return the fetched data
    res.status(200).json({
      success: true,
      attendanceData,
    });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error("Error fetching attendance data:", err);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { Admin } from "../models/adminSchema.js";
// import { handleValidationError } from "../middlewares/errorHandler.js";
// import { Attendance } from "../models/attendancestudent.js";

// // Function to generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
// };

// // Controller for registering a new admin
// export const adminRegister = async (req, res, next) => {
//   const { email, password, fullName } = req.body;

//   try {
//     // Validate input
//     if (!email || !password || !fullName) {
//       return handleValidationError("Please fill the form!", 400);
//     }

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({
//         success: false,
//         message: "Admin already exists",
//         admin_id: existingAdmin._id, // Include the admin ID in the response
//       });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new admin
//     const admin = await Admin.create({
//       email,
//       password: hashedPassword,
//       fullName,
//     });

//     // Generate JWT token
//     const token = generateToken(admin._id);

//     // Send success response with the token and admin ID
//     res.status(201).json({
//       success: true,
//       message: "Admin Created!",
//       token: token,
//       admin_id: admin._id,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // Controller for admin sign-in
// export const adminSignIn = async (req, res, next) => {
//   console.log(req.body);
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return handleValidationError("Please provide email and password", 400);
//     }

//     const admin = await Admin.findOne({ email });
//     console.log(admin);
//     if (!admin) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Admin not registered" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid password" });
//     }

//     const token = generateToken(admin._id);

//     res.status(200).json({
//       success: true,
//       message: "Admin signed in successfully",
//       token,
//       data: admin,
//       admin_id: admin._id,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // Controller for fetching all students (admins)
// export const getAllStudents = async (req, res, next) => {
//   try {
//     const admins = await Admin.find();
//     res.status(200).json({
//       success: true,
//       admins,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // Controller for fetching attendance data based on course, program, and year
// export const getAttendanceData = async (req, res) => {
//   const { courseName, program, year } = req.query;

//   try {
//     const attendanceData = await Attendance.find({ courseName })
//       .populate({
//         path: "studentId",
//         match: { program, year },
//         select: "name indexNumber", // Fetch only the name and indexNumber fields
//       })
//       .sort({ "studentId.indexNumber": 1 }); // Sort by indexNumber in ascending order

//     if (!attendanceData || attendanceData.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No attendance data found for the specified criteria.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       attendanceData,
//     });
//   } catch (err) {
//     console.error("Error fetching attendance data:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error. Please try again later.",
//     });
//   }
// };
