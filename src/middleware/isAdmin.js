import { getRole, roles } from '../services/auth';
import { HttpError } from './handler';

export default (req, res, next) => {
  getRole(req.user.sub)
    .then(role => role === roles.ADMIN)
    .then(isAdmin => {
      if(!isAdmin) return next(new HttpError(403, 'Admin only access'));
      next();
    });
};
