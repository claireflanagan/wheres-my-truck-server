import { Schema, model } from 'mongoose';

const maintenanceSchema = new Schema({
    dateReported: {
        type: Date,
    },
    user: {
        type: String,
        required: true
    },
    truckId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    issueDescription: {
        type: String,
        required: true
    },
    levelOfUrgency: {
        type: String,
        enum: ['Very Urgent', 'Moderately Urgent', 'Not Urgent', 'Unknown'],
        required: true
    },
    type: {
        type: String,
        enum: ['Routine', 'Corrective']
    },
    dateResolved: {
        type: Date
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