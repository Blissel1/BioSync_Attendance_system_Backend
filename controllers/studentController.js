import { Student } from "../models/studentSchema.js";
import { Venue } from '../models/venueSchema.js';
import { Attendance } from '../models/attendanceSchema.js';
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createStudent = async (req, res, next) => {
  console.log(req.body);
  const { fullName, indexNumber, email, college, program, year, password } =
    req.body;
  try {
   
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
  const { email, password , indexNumber } = req.body;
  try {
    if (!email || !password || !indexNumber) {
      handleValidationError("Please provide email and password", 400);
    }
    const existingStudent = await Student.findOne({indexNumber });

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
    res.status(400).json({'error': 'user doesnt exist'})
    // next(err);
  }
};




export const getMatchingFormAndVenue = async (req, res, next) => {
  const { studentId } = req.params;

  try {
    // Fetch the student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Fetch the form filled by the admin that matches the student's program and year
    const matchingForm = await Attendance.findOne({
      program: student.program,
      year: student.year,
    });

    if (!matchingForm) {
      return res.status(404).json({
        success: false,
        message: 'No matching form found',
      });
    }

    // Fetch the corresponding venue based on the form's buildingName and roomName
    const venue = await Venue.findOne({
      buildingName: matchingForm.buildingName,
      roomName: matchingForm.roomName,
    });

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: 'Venue not found',
      });
    }

    res.status(200).json({
      success: true,
      formDetails: matchingForm,
      venueLocation: venue.locations,
    });
  } catch (err) {
    next(err);
  }
};

