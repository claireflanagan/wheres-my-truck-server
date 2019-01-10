const mongoose = require('mongoose');
import { Schema, model, Mongoose } from 'mongoose';

const tripSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  tripPurpose: {
    type: String
  },
  gotLocation: {
    type: String,
    required: true
  },
  endLocation: {
    type: String
  }
})

export default model('Trip', tripSchema);