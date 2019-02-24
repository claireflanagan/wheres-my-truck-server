import { config } from 'dotenv';
import connect from '../utils/connect';
import mongoose from 'mongoose';
import request from 'supertest';
import app from './app';
import { createTruck } from './trucks.test';

config();

const createMaintenance = maintenance => {
  return request(app)
    .post('/api/maintenances')
    .send(maintenance)
    .then(res => res.body);
};

describe('maintenance routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropCollection('maintenances').catch(() => { });
  });

  beforeEach(() => {
    return mongoose.connection.dropCollection('trucks').catch(() => { });
  });

  afterAll(() => {
    return mongoose.connection.close();
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
    descriptionOfMaintenancePerformed: [{
      description: 'Brakes fixed',
      cost: 231.23
    }],
    issueOpen: false
  };
  const maintenance3 = {
    dateReported: '01/01/1999',
    user: 'User1',
    issueDescription: 'Windshield not working',
    levelOfUrgency: 'Not Urgent',
    type: 'Corrective',
    dateResolved: '01/01/2010',
    descriptionOfMaintenancePerformed: [{
      description: 'Windshield fixed',
      cost: 990.90
    }],
    issueOpen: false
  };

  beforeEach(() => {
    return Promise.all([createTruck(truck2), createTruck(truck3)])
      .then(created => {
        createdTrucks = created;
        maintenance2.truckId = createdTrucks[0]._id;
        maintenance3.truckId = createdTrucks[0]._id;
      });
  });

  beforeEach(() => {
    return Promise.all([createMaintenance(maintenance2), createMaintenance(maintenance3)])
      .then(created => {
        createdMaintenances = created;
        return createdMaintenances; 
      });
  });

  it('can create a new maintenance', () => {
    const maintenance = {
      dateReported: '01/01/1999',
      user: 'User1',
      truckId: createdTrucks[0]._id,
      issueDescription: 'Power steering not working',
      levelOfUrgency: 'Not Urgent',
      type: 'Corrective',
      dateResolved: '01/01/2010',
      descriptionOfMaintenancePerformed: [{
        description: 'Power steering fixed',
        cost: 343.20
      }],
      issueOpen: false
    };
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
        expect(res.body).toContainEqual({ _id: expect.any(String), __v: 0, ...maintenance2 });
        expect(res.body).toContainEqual({ _id: expect.any(String), __v: 0, ...maintenance3 });
      });
  });
});
