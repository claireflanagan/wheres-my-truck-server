import { config } from 'dotenv';
import connect from '../utils/connect';
import mongoose from 'mongoose';
import request from 'supertest';
import app from './app';

config();
connect('mongodb://localhost:27017/truck_test');

const createTruck = truck => {
    return request(app)
    .post('/api/trucks')
    .send(truck)
    .then(res => res.body);
}

describe('truck routes', () => {
    beforeEach(() => {
        return mongoose.connection.dropCollection('trucks').catch(() => {});
    });

    it('can create a new truck', () => {
        const truck = {
            name: 'TruckOne', 
            location: 'the office', 
            vin: '1HGBH41JXMN109186', 
            plates: 'AZ - 29901J', 
            year: 1999, 
            make: 'Toyota', 
            model: '4Runner', 
            tireSize: 20, 
            boughtDate: '03/03/2010', 
            registration: 'https://www.dmv.ca.gov/imageserver/dmv/images/vr/regcard_w_arrow2.jpg', 
            insurance: 'https://approvedauto.files.wordpress.com/2013/12/id-card-example.jpg',
            inUse: false,
            tires: [{
                currentTires: 'Goodyear',
                spares: 'two spares',
                boltPattern: 'Metric',
                victorsSpares: 'yes'
            }],
            keys: [{
                keyCodeUpdated: true,
                numberOfKeysInLockbox: 3
            }],
            status: [{
                statusLevel: 'In service',
                statusNotes: 'Oil changed needed soon'
            }],
            thingsToKnow: 'Must wiggle key seven times before starting the car'
        }
        return request(app)
            .post('/api/trucks')
            .send(truck)
            .then(res => {
                expect(res.body).toEqual({
                    ...truck,
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });
});