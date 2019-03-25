export const roles = {
  ADMIN: 'admin',
  USER: 'user'
};

export const inviteUser = (email, role) => {
  return Promise.resolve({
    email,
    role,
    id: '1234'
  });
};

export const changeRole = (id, role) => {
  return Promise.resolve({
    id,
    role,
    email: 'test@test.com'
  });
};

export const getRole = id => {
  return Promise.resolve('admin');
};

export const getUsers = (page, perPage = 25) => {
  return Promise.resolve([]);
};
