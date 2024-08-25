import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  building: String,
  roomName: String,
  locations: {
    button1: { lat: Number, long: Number },
    button2: { lat: Number, long: Number },
    button3: { lat: Number, long: Number },
    button4: { lat: Number, long: Number },
    // button5: { alt: Number  },
    // button6: { alt: Number}, 
  },
});

export const Venue = mongoose.model("Venue", venueSchema);
