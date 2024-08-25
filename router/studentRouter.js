import express from "express";
import { getAllStudents, createStudent ,studentSignIn,getMatchingFormAndVenue  } from "../controllers/studentController.js";

const router = express.Router();

router.get('/getall', getAllStudents);
router.post('/', createStudent);
router.post ('/student',studentSignIn )
router.get('/getMatchingFormAndVenue/:studentId', getMatchingFormAndVenue);


export default router;


