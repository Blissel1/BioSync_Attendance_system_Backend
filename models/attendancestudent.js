import mongoose from "mongoose";
const AttendanceSignSchema = new mongoose.Schema({

  date: { type: Date, required: true },
  email: { type: mongoose.Schema.Types.ObjectId,ref:'Admin', required: true ,unique:true},
  status: { type: String, enum: ['Present', 'Absent'], required: true },
  name: { type: mongoose.Schema.Types.ObjectId,ref:'Student', required: true },
  indexNumber: { type:mongoose.Schema.Types.ObjectId,ref:'Student', required: true, unique: true },
  course:{type: mongoose.Schema.Types.ObjectId,ref:'Student', required: true},
  // attendanceRecords: [attendanceStudentSchema]
});
export const Attendance = mongoose.model('AttendanceStudent', AttendanceSignSchema);