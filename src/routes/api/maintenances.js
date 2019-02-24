import { Router } from 'express';
import Maintenance from '../../models/maintenance';

export default Router()
  .post('/', (req, res, next) => {
    Maintenance.create(req.body)
      .then(maintenance => res.json(maintenance))
      .catch(next);
  })

  .get('/truck/:truckId', (req, res, next) => {
    Maintenance.find()
      .lean()
      .then(maintenances => res.json(maintenances))
      .catch(next); 
  })
  
  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    Maintenance.findById(id)
      .then(maintenance => res.json(maintenance))
      .catch(next);
  });
