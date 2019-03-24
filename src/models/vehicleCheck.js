const mongoose = require('mongoose');
import { Schema, model } from 'mongoose';

const vehicleCheckSchema = new Schema({
  date: String,
  user: {
    type: String,
    required: true
  },
  truckId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Truck',
    required: true
  },
  inService: Boolean,
  motorOil: {
    ok: Boolean,
    notes: String
  },
  coolant: {
    ok: Boolean,
    notes: String
  },
  brakeFluid: {
    ok: Boolean,
    notes: String
  },
  powerSteeringFluid: {
    ok: Boolean,
    notes: String
  },
  fourWheelDrive: {
    ok: Boolean,
    notes: String
  },
  batteryCables: {
    ok: Boolean,
    notes: String
  },
  lights: {
    ok: Boolean,
    notes: String
  },
  acAndHeat: {
    ok: Boolean,
    notes: String
  },
  insurance: {
    ok: Boolean,
    notes: String
  },
  registration: {
    ok: Boolean,
    notes: String
  },
  lpTags: {
    ok: Boolean,
    notes: String
  }
});

export default model('VehicleCheck', vehicleCheckSchema);
