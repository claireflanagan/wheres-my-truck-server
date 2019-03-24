import { Router } from 'express';
import { inviteUser, getRole, changeRole, getUsers } from '../../services/auth';
import isAdmin from '../../middleware/isAdmin';

export default Router()
  .get('/users', isAdmin, (req, res, next) => {
    const { page = 1, perPage } = req.query;
    getUsers(page, perPage)
      .then(users => res.send(users))
      .catch(next);
  })

  .post('/invite', isAdmin, (req, res, next) => {
    const { email } = req.body;
    inviteUser(email)
      .then(user => res.json(user))
      .catch(next);
  })

  .put('/role', isAdmin, (req, res, next) => {
    const { id, role } = req.body;
    changeRole(id, role)
      .then(user => res.send(user))
      .catch(next);
  })

  .get('/role', (req, res, next) => {
    getRole(req.user.sub)
      .then(role => res.json({ role }))
      .catch(next);
  });
