import mongoose from "mongoose";

const recordschema = new mongoose.Schema({
  email: {
    type: String,
    ref:'admin',
    required: true
  },
  attendanceRecords:[attendanceStudentSchema]




});
module.exports= mongoose.model('records','recordschema');