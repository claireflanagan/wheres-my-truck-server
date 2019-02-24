import { config } from 'dotenv';
import connect from '../utils/connect';
import mongoose from 'mongoose';
import request from 'supertest';
import app from './app';

config();

export const createIssue = issue => {
  return request(app)
    .post('/api/issues')
    .send(issue)
    .then(res => res.body);  
};

describe('issue routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropCollection('issues').catch(() => { });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  const issue1 = {
    date: '1/1/17',
    description: 'high pitched squeal',
    dateResolved: '11/19/18'
  };

  const issue2 = {
    date: '1/1/19',
    description: 'high pitched squeak',
    dateResolved: '1/29/19'
  };

  it('can create a new issue', () => {
    return request(app)
      .post('/api/issues')
      .send(issue1)
      .then(res => {
        expect(res.body).toEqual({
          ...issue1,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all issues', () => {
    return Promise.all([createIssue(issue1), createIssue(issue2)])
      .then(([issue1Created, issue2Created]) => {
        return Promise.all([
          Promise.resolve(issue1Created),
          Promise.resolve(issue2Created),
          request(app).get('/api/issues')
        ]);
      })
      .then(([issue1Created, issue2Created, res]) => {
        const issues = res.body;
        expect(issues).toHaveLength(2);
        expect(issues).toContainEqual(issue1Created);
        expect(issues).toContainEqual(issue2Created);
      });
  });

  it('can get an issue by id', () => {
    return createIssue(issue1)
      .then((issue1Created) => {
        return Promise.all([
          Promise.resolve(issue1Created),
          request(app).get(`/api/issues/${issue1Created._id}`)
        ]);
      })
      .then(([issue1Created, res]) => {
        const issue = res.body;
        expect(issue).toEqual(issue1Created);
      });
  });

  it('can edit an issue', () => {
    return createIssue(issue1)
      .then((issue1Created) => {
        return Promise.all([
          Promise.resolve(issue1Created),
          request(app).patch(`/api/issues/${issue1Created._id}`)
            .send({ dateResolved: '3/10/19' })
        ]);
      })
      .then(([issue1Created, res]) => {
        const issue = res.body;
        expect(issue).toEqual({
          _id: issue1Created._id,
          __v: 0,
          date: '1/1/17',
          description: 'high pitched squeal',
          dateResolved: '3/10/19'
        });
      });
  });
});


