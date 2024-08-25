import { Venue } from '../models/venueSchema.js';
// import { handleValidationError } from '../middlewares/errorHandler'; 

// Controller to create or update a venue with location data
export const createVenue = async (req, res, next) => {
  const { locations, building, roomName } = req.body;

  try {
    // Check if the location exists
    let venue = await Venue.findOne({ building, roomName });
    
    // If the venue does not exist, create a new one
    if (!venue) {
      venue = new Venue({ building, roomName, locations: {} });
    }

    // Update the location data based on the buttons
    Object.keys(locations).forEach(button => {
      const locationData = locations[button];
      if (locationData.lat && locationData.long) {
        venue.locations[button] = {
          lat: locationData.lat,
          long: locationData.long
        };
      } else if (locationData.alt !== null) {
        venue.locations[button] = {
          alt: locationData.alt
        };
      }
    });

    // Save the venue data
    await venue.save();
    
    return res.status(200).json({
      success: true,
      message: 'Location data saved successfully',
      venue
    });
  } catch (err) {
    next(err);
  }
};

// Controller to get all locations
export const getAllLocation = async (req, res, next) => {
  try {
    const venues = await Venue.find(); // Fetch all venues from the database
    res.status(200).json({
      success: true,
      venues
    });
  } catch (err) {
    next(err);
  }
};

