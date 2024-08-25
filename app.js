import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import studentRouter from "./router/studentRouter.js";
import adminRegister from "./router/adminRoute.js";
import adminSignIn from "./router/adminRoute.js";
import locationRoute from "./router/locationRoute.js";
import { getAllStudents } from "./adminController.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import Attendance from "./router/attendance.js";

const app = express();
config({ path: "./config/config.env" });

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/registerstudents", studentRouter);
app.use("/api/v1/studentSignIn", studentRouter);
app.use("/api/v1/", adminSignIn);
app.use("/api/v1/", adminRegister);
app.use("/api/v1/", locationRoute);
app.use("/api/v1/all", locationRoute);
app.use("/api/v1/", Attendance);

dbConnection();

export default app;
