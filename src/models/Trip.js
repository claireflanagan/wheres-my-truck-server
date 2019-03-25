import { Schema, model, Types } from 'mongoose';

const tripSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  truck: {
    type: Types.ObjectId,
    ref: 'Truck'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: String
  },
  tripPurpose: {
    type: String
  },
  startLocation: {
    type: String,
    required: true
  },
  endLocation: {
    type: String
  }
});

export default model('Trip', tripSchema);
