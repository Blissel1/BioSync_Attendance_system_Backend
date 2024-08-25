import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  indexNumber: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  college: {
    type: String,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

export const Student = mongoose.model("Student", studentSchema);
