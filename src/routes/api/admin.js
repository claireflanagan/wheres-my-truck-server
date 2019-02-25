import { Router } from 'express';
import { inviteUser, getRole } from '../../services/auth';

export default Router()
  .post('/invite', (req, res, next) => {
    const { email } = req.body;
    inviteUser(email)
      .then(user => res.json({ user }))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    getRole(req.user.sub)
      .then(role => res.json({ role }))
      .catch(next);
  });
