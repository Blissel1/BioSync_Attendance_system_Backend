// // errorHandler.js
// import jwt from 'jsonwebtoken';
// import { Admin } from '../models/adminSchema.js';

// const auth = async (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await Admin.findById(decoded.id).select('-password');
//     if (!req.user) {
//       return res.status(401).json({ message: 'Authorization failed' });
//     }
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// export default auth;

// export const handleValidationError = (message, statusCode) => {
//     const error = new Error(message);
//     error.statusCode = statusCode;
//     throw error;
//   };

//   export const errorHandler = (err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';
//     res.status(statusCode).json({ success: false, message });
//   };



import jwt from 'jsonwebtoken';
import { Admin } from '../models/adminSchema.js';

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Authorization failed' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;


export const handleValidationError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  };
  
  export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ success: false, message });
  };