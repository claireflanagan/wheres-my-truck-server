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

    Maintenance.findById(id)
      .then(maintenance => res.json(maintenance))
      .catch(next);
  })

  .get('/truck/:truckId', (req, res, next) => {
    const { truckId } = req.params;

    Maintenance.find({ truck: truckId })
      .lean()
      .then(maintenances => res.json(maintenances))
      .catch(next);
  });
