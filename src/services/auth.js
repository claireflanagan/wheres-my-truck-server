import { config } from 'dotenv';
config();
import { randomBytes } from 'crypto';
import { AuthenticationClient, ManagementClient } from 'auth0';

const AUTH0_CONNECTION = process.env.AUTH0_CONNECTION;

const authClient = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID
});

const authManagementClient
  = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    audience: 'https://dudewheresmytruck.auth0.com/api/v2/',
    scope: 'create:users read:users'
  });

export const generatePassword = () => `!!${randomBytes(32).toString('hex')}!!`;

export const inviteUser = email => {
  return authManagementClient
    .createUser({
      email,
      password: generatePassword(),
      connection: AUTH0_CONNECTION
    })
    .then(user => {
      return Promise.all([
        Promise.resolve(user),
        authClient.requestChangePasswordEmail({
          email: user.email,
          connection: AUTH0_CONNECTION
        })
      ]);
    })
    .then(([user]) => user);
};

export const getRole = id => {
  return authManagementClient.getUser({ id })
    .then(user => user.app_metadata.role || 'user');
};
