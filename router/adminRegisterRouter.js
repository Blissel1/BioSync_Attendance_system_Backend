import express from "express";
import { adminRegister, adminSignIn, getAllStudents,getAttendanceData  } from "../controllers/adminRegisterController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/adminSignIn", adminSignIn);
router.post("/admin", adminRegister);
router.get("/admin/students", auth, getAllStudents); 
router.get('/getAttendanceData', getAttendanceData);


export default router;
