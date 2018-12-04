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
        required: true
    }, 
    insurance: {
        type: String,
        required: true
    },
    inUse: {
        type: Boolean,
        default: false
    },
    tires: [{
        currentTires: { type: String },
        spares: { type: String },
        boltPattern: {
            type: String,
            enum: ['Metric', 'Standard']
        },
        victorsSpares: { type: String }
    }],
    keys: [{
        keyCodeUpdated: { type: Boolean },
        numberOfKeysInLockbox: { type: Number }
    }],
    status: [{
        statusLevel: {
            type: String, 
            enum: [ 'In shop', 'Out of service', 'Needs to come in next', 'In service', 'Pending']
        },
        statusNotes: { type: String }
    }],
    thingsToKnow: {
        type: String
    }
});

export default model('Truck', truckSchema);