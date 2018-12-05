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
        type: String
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
    },
    tires: [{
         _id: false,
        currentTires: { type: String },
        spares: { type: String },
        boltPattern: {
            type: String,
            enum: ['Metric', 'Standard']
        },
        victorsSpares: { type: String }
    }],
    keys: [{
        _id: false,
        keyCodeUpdated: { type: Boolean },
        numberOfKeysInLockbox: { type: Number }
    }],
    status: [{
        _id: false,
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