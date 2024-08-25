// import mongoose from "mongoose";

// export const dbConnection = () => {
//     mongoose.connect('mongodb+srv://duitsonblissel:gaxw3712@cluster0.mg26zmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//         dbName: "ATTENDANCE_SYSTEM",
//     })
//     .then(() => {
//         console.log("Connected to database");
//     })
//     .catch((error) => {
//         console.log("Error occured while connecting to database");
//     });
// };

import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb+srv://duitsonblissel:gaxw3712@cluster0.mg26zmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      dbName: "ATTENDANCE_SYSTEM",
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Error occured while connecting to database", error);
  }
};
