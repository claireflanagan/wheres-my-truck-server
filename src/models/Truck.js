import { Schema, model } from 'mongoose';

const truckSchema = new Schema({
  name: {
    type: String
  },
  location: {
    type: String
  },
  vin: {
    type: String,
    required: true
  },
  plates: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    min: 1950,
    max: 2050
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  tireSize: {
    type: Number,
  },
  boughtDate: {
    type: Date
  },
  registration: {
    type: String,
  },
  insurance: {
    type: String,
  },
  inUse: {
    type: Boolean,
    default: false
  }
});

export default model('Truck', truckSchema);
