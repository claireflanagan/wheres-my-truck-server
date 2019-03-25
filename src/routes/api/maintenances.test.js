import { getTruck, getIssue, getMaintenances, getMaintenance } from '../../utils/testHelpers';
import request from 'supertest';
import app from '../app';

jest.mock('../../middleware/ensureAuth.js');

describe('maintenance routes', () => {
  it('can create a new maintenance', async() => {
    const truck = await getTruck();
    const issue = await getIssue();
    const startDate = new Date();
    const maintenance = {
      startDate,
      truck: truck._id,
      levelOfUrgency: 'Not Urgent',
      type: 'Corrective',
      issueOpen: true,
      issue: issue._id
    };
    return request(app)
      .post('/api/maintenances')
      .send(maintenance)
      .then(res => {
        expect(res.body).toEqual({
          ...maintenance,
          user: '1234',
          startDate: maintenance.startDate.toISOString(),
          descriptionOfMaintenancePerformed: [],
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all maintenances for a truck', async() => {
    const truck = await getTruck();
    const maintenances = await getMaintenances({ truck: truck._id });
    return request(app)
      .get(`/api/maintenances/truck/${truck._id}`)
      .then(res => {
        expect(res.body).toHaveLength(maintenances.length);
        maintenances.forEach(maint => expect(res.body).toContainEqual(maint));
      });
  });

  it('can get a maintenance by id', async() => {
    const maintenance = await getMaintenance();
    return request(app)
      .get(`/api/maintenances/${maintenance._id}`)
      .then(res => {
        expect(res.body).toEqual(maintenance);
      });
  });

  it('can update a maintenance by id', async() => {
    const maintenance = await getMaintenance();
    return request(app)
      .get(`/api/maintenances/${maintenance._id}`)
      .then(res => {
        expect(res.body).toEqual(maintenance);
      });
  });
});
