import { Schema, model, Types } from 'mongoose';

const issueSchema = new Schema({
  reportedDate: {
    type: Date,
    required: true
  },
  user: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  resolvedDate: {
    type: Date
  },
  truck: {
    type: Types.ObjectId,
    ref: 'Truck'
  }
});


export default model('Issue', issueSchema);
