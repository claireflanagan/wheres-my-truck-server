import { Schema, model, Types } from 'mongoose';

const maintenanceSchema = new Schema({
  startDate: {
    type: Date,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  truck: {
    type: Types.ObjectId,
    ref: 'Truck',
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
  resolvedDate: {
    type: Date
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
  issue: {
    type: Types.ObjectId,
    ref: 'Issue'
  }
});

export default model('Maintenance', maintenanceSchema);
