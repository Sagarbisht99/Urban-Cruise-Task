import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email : {
     type: String,
     required: true,
     unique: true,  
     trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  source: {
    type: String,   
    enum: ["facebook", "google", "website"],
    default: "website", 
    trim: true,
                        },
}, { timestamps: true });

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export default Lead;