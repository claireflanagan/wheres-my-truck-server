import { getTruck, getTrucks } from '../../utils/testHelpers';
import request from 'supertest';
import app from '../app';

jest.mock('../../middleware/ensureAuth.js');
jest.mock('../../services/auth.js');

describe('truck routes', () => {
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
      boughtDate: new Date().toISOString(),
      registration: 'https://www.dmv.ca.gov/imageserver/dmv/images/vr/regcard_w_arrow2.jpg',
      insurance: 'https://approvedauto.files.wordpress.com/2013/12/id-card-example.jpg'
    };
    return request(app)
      .post('/api/trucks')
      .send(truck)
      .then(res => {
        expect(res.body).toEqual({
          ...truck,
          _id: expect.any(String),
          inUse: false,
          __v: 0
        });
      });
  });

  it('can get all trucks', async() => {
    const trucks = await getTrucks();
    return request(app)
      .get('/api/trucks')
      .then(({ body }) => {
        expect(body).toHaveLength(trucks.length);
        trucks.forEach(truck => expect(body).toContainEqual(truck));
      });
  });

  it('can get a truck by id', async() => {
    const truck = await getTruck();
    return request(app).get(`/api/trucks/${truck._id}`)
      .then(({ body }) => {
        expect(body).toEqual(truck);
      });
  });

});
