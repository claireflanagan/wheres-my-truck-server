import { config } from 'dotenv';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

config();

export default () => {
  if(process.env.NODE_ENV === 'test') {
    return (req, res, next) => next();
  }
  return jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: 'rq6G1k70qJ6rAQboL3hORY67PvhSwoYI',
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });
};
