const mongoose = require('mongoose');
import { Schema, model, Mongoose } from 'mongoose';

const issueSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  dateResolved: {
    type: String
  }
})


export default model('Issue', issueSchema);