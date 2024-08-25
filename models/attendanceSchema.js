import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  program: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
});

export const Attendance = mongoose.model('Attendance', attendanceSchema);
