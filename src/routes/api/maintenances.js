import { Router } from 'express';
import Maintenance from '../../models/Maintenance';

export default Router()
  .post('/', (req, res, next) => {
    const {
      startDate,
      truck,
      levelOfUrgency,
      type,
      issueOpen,
      issue
    } = req.body;

    Maintenance.create({
      user: req.user.sub,
      startDate,
      truck,
      levelOfUrgency,
      type,
      issueOpen,
      issue
    })
      .then(maintenance => res.json(maintenance))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    Maintenance.find({ truck: id })
      .lean()
      .then(maintenances => res.json(maintenances))
      .catch(next);
  });
