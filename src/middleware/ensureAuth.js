import { config } from 'dotenv';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

config();

export default () => jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: 'https://dudewheresmytruck',
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: ['RS256']
});
