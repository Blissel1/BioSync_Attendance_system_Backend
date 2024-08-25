import express from "express";
// import { adminRegister, adminSignIn } from "../controllers/adminRegisterController.js";
import { createAttendance } from "../controllers/attendanceController.js"; // Create this file if not exists
import auth from "../middlewares/errorHandler.js";

const router = express.Router();

// router.post("/adminSignIn", adminSignIn);
// router.post("/admin", adminRegister);
router.post("/attendance/create",auth,  createAttendance); // Use the auth middleware for protection

export default router;
 