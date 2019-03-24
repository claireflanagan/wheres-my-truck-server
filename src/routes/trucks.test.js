import { config } from 'dotenv';
import connect from '../utils/connect';
import mongoose from 'mongoose';
import request from 'supertest';
import app from './app';

config();

export const createTruck = truck => {
  return request(app)
    .post('/api/trucks')
    .send(truck)
    .then(res => res.body);
};

describe('truck routes', () => {
  beforeAll(() => {
    return connect();
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
    };
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
        return Promise.all([
          Promise.resolve(truck3Created),
          request(app).get(`/api/trucks/${truck3Created._id}`)
        ]);
      })
      .then(([truck3Created, res]) => {
        const truck = res.body;
        expect(truck).toEqual(truck3Created);
      });
  });

  it('can update a truck by id', () => {
    return createTruck(truck3)
      .then((truck3Created) => {
        return Promise.all([
          Promise.resolve(truck3Created),
          request(app)
            .put(`/api/trucks/${truck3Created._id}`)
            .send({
              keys: [{
                keyCodeUpdated: true,
                numberOfKeysInLockbox: 44
              }],
              status: [{
                statusLevel: 'Out of Service',
                statusNotes: 'Oil changed needed soon'
              }]
            })
        ]);
      })
      .then(([truck3Created, res]) => {
        const updatedTruck = res.body;
        expect(updatedTruck).toEqual({
          __v: 0,
          _id: truck3Created._id,
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
            numberOfKeysInLockbox: 44
          }],
          status: [{
            statusLevel: 'Out of Service',
            statusNotes: 'Oil changed needed soon'
          }],
          thingsToKnow: 'Must wiggle key seven times before starting the car'
        });
      });
  });

});
