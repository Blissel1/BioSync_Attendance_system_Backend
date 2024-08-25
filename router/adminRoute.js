import express from "express";
import {
  adminRegister,
  adminSignIn,
} from "../controllers/adminRegisterController.js";

const router = express.Router();

router.post("/adminRegister", adminRegister);
router.post("/adminSignIn", adminSignIn);

export default router;

// import { Admin } from "../models/adminSchema.js";
// import { handleValidationError } from "../middlewares/errorHandler.js";

// const adminRegister =  async (req, res, next) => {
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

//  const adminSignIn = async (req, res, next) => {
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

//     res.status(200).json({
//       success: true,
//       message: "Admin signed in successfully",
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// const router = express.Router();

// router.post("/signin", adminSignIn);
// router.post("/admin", adminRegister);

// export default router;
// export default = {adminSignIn , adminRegister}

// import express from 'express';
