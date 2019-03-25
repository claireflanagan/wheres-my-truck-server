import { getTruck, getTrips, getTrip } from '../../utils/testHelpers';
import request from 'supertest';
import app from '../app';

jest.mock('../../middleware/ensureAuth.js');

describe('trip routes', () => {
  it('can create a new trip', async() => {
    const truck = await getTruck();
    const startDate = new Date();
    return request(app)
      .post('/api/trips')
      .send({
        truck: truck._id,
        startDate,
        tripPurpose: 'To do stuff',
        startLocation: 'over here'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: '1234',
          truck: truck._id,
          startDate: startDate.toISOString(),
          tripPurpose: 'To do stuff',
          startLocation: 'over here',
          __v: 0
        });
      });
  });

  it('can get all trips', async() => {
    const trips = await getTrips();
    return request(app).get('/api/trips')
      .then(({ body }) => {
        expect(body).toHaveLength(trips.length);
        trips.forEach(trip => expect(body).toContainEqual(trip));
      });
  });

  it('can get a trip by id', async() => {
    const trip = await getTrip();
    return request(app).get(`/api/trips/${trip._id}`)
      .then(({ body }) => {
        expect(body).toEqual(trip);
      });
  });

  it('can edit a trip', async() => {
    const trip = await getTrip();
    const endDate = new Date();
    return request(app)
      .patch(`/api/trips/${trip._id}`)
      .send({
        endDate,
        endLocation: 'over there'
      })
      .then(({ body }) => {
        expect(body).toEqual({
          ...trip,
          endDate: endDate.toISOString(),
          endLocation: 'over there'
        });
      });
  });
});
