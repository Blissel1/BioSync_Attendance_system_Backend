import express from 'express';
import { createVenue, getAllLocation } from '../controllers/venueController.js'; // Adjust the path to your controller

const router = express.Router();

// Route to handle creation/updating of location data
router.post('/create', createVenue);

// Route to retrieve all location data
router.get('/all', getAllLocation);
export default router;
