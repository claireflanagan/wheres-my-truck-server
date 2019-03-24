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
    scope: 'create:users read:users update:users'
  });

const prepareUser = user => ({
  ...user,
  id: user.user_id,
  role: user.app_metadata && user.app_metadata.role || roles.USER
});

export const roles = {
  ADMIN: 'admin',
  USER: 'user'
};


export const generatePassword = () => `!!${randomBytes(32).toString('hex')}!!`;

export const inviteUser = (email, role = roles.USER) => {
  return authManagementClient
    .createUser({
      email,
      password: generatePassword(),
      app_metadata: {
        role
      },
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
    .then(([user]) => prepareUser(user));
};

export const changeRole = (id, role) => {
  return authManagementClient.updateUser({ id }, {
    connection: AUTH0_CONNECTION,
    app_metadata: {
      role
    }
  })
    .then(user => prepareUser(user));
};

export const getRole = id => {
  return authManagementClient.getUser({ id })
    .then(user => prepareUser(user))
    .then(user => user.role);
};

export const getUsers = (page, perPage = 25) => {
  return authManagementClient.getUsers({
    include_totals: true,
    per_page: perPage,
    page,
    search_engine: 'v3'
  })
    .then(({ limit, total, users }) => ({
      totalPages: Math.floor(limit / total),
      users: users.map(prepareUser)
    }));
};
