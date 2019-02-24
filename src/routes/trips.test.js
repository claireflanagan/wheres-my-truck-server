import { config } from 'dotenv';
import connect from '../utils/connect';
import mongoose from 'mongoose';
import request from 'supertest';
import app from './app';

config();

export const createTrip = trip => {
  return request(app)
    .post('/api/trips')
    .send(trip)
    .then(res => res.body);
};

describe('trip routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropCollection('trips').catch(() => {});
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
    
  const trip1 = {
    startDate: '1/12/19',
    endDate: '1/14/19',
    tripPurpose: 'routine water drop',
    gotLocation: 'Tucson Office',
    endLocation: 'School'
  };

  const trip2 = {
    startDate: '1/12/18',
    endDate: '1/14/18',
    tripPurpose: 'routine water drop',
    gotLocation: 'School',
    endLocation: 'School'
  };

  it('can create a new trip', () => {
    return request(app)
      .post('/api/trips')
      .send(trip1)
      .then(res => {
        expect(res.body).toEqual({
          ...trip1,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all trips', () => {
    return Promise.all([createTrip(trip1), createTrip(trip2)])
      .then(([truck1Created, truck2Created]) => {
        return Promise.all([
          Promise.resolve(truck1Created),
          Promise.resolve(truck2Created),
          request(app).get('/api/trips')
        ]);
      })
      .then(([truck1Created, truck2Created, res]) => {
        const trips = res.body;
        expect(trips).toHaveLength(2);
        expect(trips).toContainEqual(truck1Created);
        expect(trips).toContainEqual(truck2Created);
      });
  });

  it('can get a trip by id', () => {
    return createTrip(trip1)
      .then((trip1Created) => {
        return Promise.all([
          Promise.resolve(trip1Created),
          request(app).get(`/api/trips/${trip1Created._id}`)
        ]);
      })
      .then(([trip1Created, res]) => {
        const trip = res.body;
        expect(trip).toEqual(trip1Created);
      });
  });

  it('can edit a trip', () => {
    return createTrip(trip1)
      .then((trip1Created) => {
        return Promise.all([
          Promise.resolve(trip1Created),
          request(app).patch(`/api/trips/${trip1Created._id}`)
            .send({ endDate: '1/16/19', endLocation: 'Other Office' })
        ]);
      })
      .then(([trip1Created, res]) => {
        const trip = res.body;
        expect(trip).toEqual({
          _id: trip1Created._id,
          __v: 0,
          startDate: '1/12/19',
          endDate: '1/16/19',
          tripPurpose: 'routine water drop',
          gotLocation: 'Tucson Office',
          endLocation: 'Other Office'
        });
      });
  });
});
