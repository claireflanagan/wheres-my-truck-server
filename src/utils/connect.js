import { parse } from 'url';
import mongoose from 'mongoose';

const log = (event, dbUrl) => {
  return () => {
    // eslint-disable-next-line no-console
    console.log(`${event.toUpperCase()}: connection to ${dbUrl}`);
  };
};

const redactURLAuth = url => {
  const parsedUrl = parse(url);
  const redactedAuth = parsedUrl.auth ? '***:***@' : '';
  return `${parsedUrl.protocol}//${redactedAuth}${parsedUrl.hostname}:${parsedUrl.port}${parsedUrl.path}`;
};

module.exports = (dbUrl = process.env.MONGODB_URI) => {
  mongoose.connect(dbUrl, { useNewUrlParser: true });
  const redactedUrl = redactURLAuth(dbUrl);
  mongoose.connection.on('error', log('error', redactedUrl));
  mongoose.connection.on('open', log('open', redactedUrl));
  mongoose.connection.on('close', log('close', redactedUrl));
};
