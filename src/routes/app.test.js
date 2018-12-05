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

const createMaintenance = maintenance => {
    return request(app)
    .post('/api/maintenances')
    .send(maintenance)
    .then(res => res.body);
}

describe('truck routes', () => {
    beforeEach(() => {
        return mongoose.connection.dropCollection('trucks').catch(() => {});
    });

    const truck2 = {
            name: 'TruckTwo', 
            location: 'the store', 
            vin: '1HGBH41JXMN109188', 
            plates: 'AZ - 29900J', 
            year: 1998, 
            make: 'Toyota', 
            model: '4Runner', 
            tireSize: 30, 
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
    const truck3 = {
            name: 'TruckThree', 
            location: 'the office', 
            vin: '1HGBH41JXMN109086', 
            plates: 'AZ - 29991J', 
            year: 1994, 
            make: 'Toyota', 
            model: '4Runner', 
            tireSize: 25, 
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

    it('can get all trucks', () => {
        
        return Promise.all([createTruck(truck2), createTruck(truck3)])
            .then(([truck2Created, truck3Created]) => {
                return Promise.all([
                    Promise.resolve(truck2Created),
                    Promise.resolve(truck3Created),
                    request(app).get('/api/trucks')
                ]);
            })
            .then(([truck2Created, truck3Created, res]) => {
                const trucks = res.body;
                expect(trucks).toHaveLength(2);
                expect(trucks).toContainEqual(truck2Created);
                expect(trucks).toContainEqual(truck3Created);
            });
    });

    it('can get a truck by id', () => {
        return createTruck(truck3)
        .then((truck3Created) => {
            console.log('t4', truck3Created);
            return Promise.all([
                Promise.resolve(truck3Created),
                request(app).get(`/api/trucks/${truck3Created._id}`)
            ]);
        })
        .then(([truck3Created, res]) => {
            const truck = res.body;
            expect(truck).toEqual(truck3Created);
        })
    });

});

describe('maintenance routes', () => {

    beforeEach(() => {
        return mongoose.connection.dropCollection('maintenances').catch(() => {})
    });

    const truck2 = {
        name: 'TruckTwo', 
        location: 'the store', 
        vin: '1HGBH41JXMN109188', 
        plates: 'AZ - 29900J', 
        year: 1998, 
        make: 'Toyota', 
        model: '4Runner', 
        tireSize: 30, 
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
    };
    const truck3 = {
        name: 'TruckThree', 
        location: 'the office', 
        vin: '1HGBH41JXMN109086', 
        plates: 'AZ - 29991J', 
        year: 1994, 
        make: 'Toyota', 
        model: '4Runner', 
        tireSize: 25, 
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
    };
    let createdTrucks = [];
    let createdMaintenances = [];

    const maintenance2 = {
        dateReported: '01/01/1999',
        user: 'User2',
        issueDescription: 'Brakes not working',
        levelOfUrgency: 'Not Urgent',
        type: 'Corrective',
        dateResolved: '01/01/2010',
        descriptionOfMaintenancePerformed: 'Brakes fixed',
        issueOpen: false
    };
    const maintenance3 = {
        dateReported: '01/01/1999',
        user: 'User1',
        issueDescription: 'Windshield not working',
        levelOfUrgency: 'Not Urgent',
        type: 'Corrective',
        dateResolved: '01/01/2010',
        descriptionOfMaintenancePerformed: 'Windshield fixed',
        issueOpen: false
    };
    
    beforeEach(() => {
        return Promise.all([createTruck(truck2), createTruck(truck3)])
        .then(created => {
            createdTrucks = created;
            maintenance2.truckId = createdTrucks[0]._id;
            maintenance3.truckId = createdTrucks[0]._id;
        });
    })
    
    beforeEach(() => {
        return Promise.all([createMaintenance(maintenance2), createMaintenance(maintenance3)])
        .then(created => {
            createdMaintenances = created;
        });
    })
    
    it('can create a new maintenance', () => {
        const maintenance = {
            dateReported: '01/01/1999',
            user: 'User1',
            truckId: createdTrucks[0]._id,
            issueDescription: 'Power steering not working',
            levelOfUrgency: 'Not Urgent',
            type: 'Corrective',
            dateResolved: '01/01/2010',
            descriptionOfMaintenancePerformed: 'Power steering fixed',
            issueOpen: false
        }
        return request(app)
            .post('/api/maintenances')
            .send(maintenance)
            .then(res => {
                expect(res.body).toEqual({
                    ...maintenance,
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });

    it('can get all maintenances for a truck', () => {
        
        return request(app)
            .get(`/api/maintenances/${createdTrucks[0]._id}`)
            .then((res) => {
                expect(res.body).toHaveLength(2);
                // expect(maintenances).toContainEqual(maintenance2);
                // expect(maintenances).toContainEqual(maintenance3);
            });
    })


});