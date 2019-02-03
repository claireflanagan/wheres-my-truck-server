import { Router } from 'express';
import Trip from '../../models/trip';

export default Router()
  .post('/', (req, res) => {
    Trip.create(req.body)
      .then(trip => res.json(trip))
      .catch(err => console.error(err));
  })

  .get('/', (req, res, next) => {
    Trip.find()
      .select()
      .lean()
      .then(trips => res.json(trips))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    Trip.findById(id)
      .then(trip => res.json(trip))
      .catch(next);
  })
  
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const { endDate, endLocation } = req.body;
    
    Trip.findByIdAndUpdate(id, { endDate, endLocation }, {new: true})
      .then(updatedTrip => res.json(updatedTrip))
      .catch(next);
  });


