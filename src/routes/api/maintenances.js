import { Router } from 'express';
import Maintenance from '../../models/maintenance';

export default Router()
  .post('/', (req, res) => {
    Maintenance.create(req.body)
      .then(maintenance => res.json(maintenance))
      .catch(err => console.log(err));
  })

  .get('/:id', (req, res) => { // is this wrong?  why id if getting all?
    Maintenance.find()
      .lean()
      .then(maintenances => res.json(maintenances)); 
  });
