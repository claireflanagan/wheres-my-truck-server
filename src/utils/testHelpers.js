import { config } from 'dotenv';
import connect from './connect';
import mongoose from 'mongoose';
import seedData from './seedData';
import Truck from '../models/Truck';
import Maintenance from '../models/Maintenance';
import Issue from '../models/Issue';
import Trip from '../models/Trip';

config();

beforeAll(() => connect());

beforeEach(() => mongoose.connection.dropDatabase());

beforeEach(() => seedData());

afterAll(() => mongoose.connection.close());

export const prepare = doc => JSON.parse(JSON.stringify(doc));
export const prepareList = docs => docs.map(prepare);

export const setupTestGetters = Model => {
  return [
    (query = {}) => Model.findOne(query).then(prepare),
    (query = {}) => Model.find(query).then(prepareList)
  ];
};

export const [getTruck, getTrucks] = setupTestGetters(Truck);
export const [getMaintenance, getMaintenances] = setupTestGetters(Maintenance);
export const [getIssue, getIssues] = setupTestGetters(Issue);
export const [getTrip, getTrips] = setupTestGetters(Trip);
