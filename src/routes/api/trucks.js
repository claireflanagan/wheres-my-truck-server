import { Router } from 'express';
import Truck from '../../models/truck';

export default Router()
  .post('/', (req, res, next) => {
    Truck.create(req.body)
      .then(truck => res.json(truck))
      .catch(next); 
  })

  .get('/', (req, res, next) => {
    Truck.find()
      .select()
      .lean()
      .then(trucks => res.json(trucks))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    Truck.findById(id)
      .then(truck => res.json(truck))
      .catch(next);
  })
  
  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const updatedTruck = req.body;

    Truck.findByIdAndUpdate(id, updatedTruck, { new: true })
      .then(newTruck => res.json(newTruck))
      .catch(next);
  });
