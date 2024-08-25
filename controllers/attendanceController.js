import { Attendance } from '../models/attendanceSchema.js'; // Make sure to create an Attendance schema/model
import { Admin } from '../models/adminSchema.js'; // Make sure to create an Admin schema/model



export const createAttendance = async (req, res, next) => {
  const { program, year,course, building, roomNumber, startDate, startTime, endDate, endTime } = req.body;
  const adminId = req.user._id; // Extract the admin ID from the request object
  console.log(adminId);
// 
  try {
    const newAttendance = await Attendance.create({
      program,
      year,
      course,
      building,
      roomNumber,
      startDate,
      startTime,
      endDate,
      endTime,
      // createdBy: adminId, // Save the admin ID who created the attendance
    });
    

    res.status(201).json({
      success: true,
      message: 'Attendance successfully created',
      data: newAttendance,
    });
  } catch (err) {
    next(err);
  }
};
