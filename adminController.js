// import { Admin } from "../models/adminSchema.js";
// import { handleValidationError } from "../middlewares/errorHandler.js";
// // import { usersController } from "./usersControllers.js/index.js";

// export const adminRegister = async (req, res, next) => {
//   console.log(req.body);
//   const { email, password, fullName } = req.body;
//   try {
//     if (!email || !password || !fullName) {
//       handleValidationError("Please Fill Form!", 400);
//     }

//     // Check if the admin already exists in the database
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Admin already exists" });
//     }

//     await Admin.create({ email, password, fullName });
//     res.status(200).json({
//       success: true,
//       message: "Admin Created!",
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const adminSignIn = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {
//       handleValidationError("Please provide email and password", 400);
//     }
//     const existingAdmin = await Admin.findOne({ email });

//     if (!existingAdmin) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid email or password" });
//     }
//     const isPasswordValid = await existingAdmin.isValidPassword(password);

//     if (!isPasswordValid) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid email or password" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Admin signed in successfully",
//     });
//   } catch (err) {
//     next(err);
//   }
// };

import { Student } from "./models/studentSchema.js";
import { handleValidationError } from "./middlewares/errorHandler.js";

export const createStudent = async (req, res, next) => {
  console.log(req.body);
  const { fullName, indexNumber, email, college, program, year, password } =
    req.body;
  try {
    //  if (!indexNumber || !email || !password ) {
    //   return next("Please Fill Full Form!", 400);
    // }
    await Student.create({
      fullName,
      indexNumber,
      email,
      college,
      program,
      year,
      password,
    });
    res.status(200).json({
      success: true,
      message: "Student Created!",
    });
    // res.json{'message': 'Hello world'}
  } catch (err) {
    next(err);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      students,
    });
  } catch (err) {
    next(err);
  }
};

export const studentSignIn = async (req, res, next) => {
  const { email, password, indexNumber } = req.body;
  try {
    if (!email || !password || !indexNumber) {
      handleValidationError("Please provide email and password", 400);
    }
    const existingStudent = await Student.findOne({ indexNumber });

    if (!existingStudent) {
      return res
        .status(400)
        .json({ success: false, message: "Student is not Registered" });
    } else {
      res.status(200).json({
        success: true,
        message: "Student signed in successfully",
      });
    }

    // if(existingStudent){
    //      res.status(200).json({
    //     success: true,
    //     message: "Student signed in successfully",
    //   });
    // }

    // Your sign-in logic for student goes here
    // res.status(200).json({
    //   success: true,
    //   message: "Student signed in successfully",
    // });
  } catch (err) {
    next(err);
  }
};
