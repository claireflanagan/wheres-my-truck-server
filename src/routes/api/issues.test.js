import {
  getTruck,
  getIssue,
  getIssues
} from '../../utils/testHelpers';
import request from 'supertest';
import app from '../app';

jest.mock('../../middleware/ensureAuth.js');

describe('issue routes', () => {
  it('can create a new issue', async() => {
    const truck = await getTruck();
    return request(app)
      .post('/api/issues')
      .send({
        reportedDate: Date.now(),
        description: 'Something bad happened',
        truck: truck._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          reportedDate: expect.any(String),
          user: '1234',
          description: 'Something bad happened',
          truck: truck._id,
          __v: 0
        });
      });
  });

  it('can get all issues', async() => {
    const issues = await getIssues();
    return request(app)
      .get('/api/issues')
      .then(({ body }) => {
        expect(body).toHaveLength(issues.length);
        issues.forEach(issue => expect(body).toContainEqual(issue));
      });
  });

  it('can get an issue by id', async() => {
    const issue = await getIssue();
    return request(app)
      .get(`/api/issues/${issue._id}`)
      .then(({ body }) => {
        expect(body).toEqual(issue);
      });
  });

  it('can edit an issue', async() => {
    const issue = await getIssue();
    const resolvedDate = new Date();
    return request(app)
      .patch(`/api/issues/${issue._id}`)
      .send({ resolvedDate })
      .then(res => {
        expect(res.body).toEqual({
          ...issue,
          resolvedDate: resolvedDate.toISOString()
        });
      });
  });
});
