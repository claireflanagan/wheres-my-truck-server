import mongoose from 'mongoose';
import { config } from 'dotenv';
import connect from './src/utils/connect';
import seedData from './src/utils/seedData';

config();
connect();

seedData()
  .then(() => console.log('done'))
  .catch(console.error)
  .finally(() => mongoose.connection.close());
