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
    issueDescription: {
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
    descriptionOfMaintenancePerformed: {
        type: String
    },
    issueOpen: {
        type: Boolean,
        default: true
    }
})

export default model('Maintenance', maintenanceSchema);