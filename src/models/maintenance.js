const mongoose = require('mongoose');
import { Schema, model } from 'mongoose';

const maintenanceSchema = new Schema({
  dateReported: {
    type: String
  },
  user: {
    type: String,
    required: true
  },
  truckId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Truck',
    required: true
  },
  issueDescription: { //redundant?
    type: String,
    required: true
  },
  levelOfUrgency: {
    type: String,
    enum: ['Very Urgent', 'Moderately Urgent', 'Not Urgent', 'Unknown'],
    default: 'Unknown'
  },
  type: {
    type: String,
    enum: ['Routine', 'Corrective']
  },
  dateResolved: {
    type: String
  },
  descriptionOfMaintenancePerformed: [{
    _id: false,
    description: {
      type: String
    },
    receipt: {
      type: String
    },
    cost: {
      type: Number
    },
    garage: {
      type: String
    }
  }],
  issueOpen: {
    type: Boolean,
    default: true
  },
  issueId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Issue'
  }
});

export default model('Maintenance', maintenanceSchema);
