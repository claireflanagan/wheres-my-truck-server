import { Router } from 'express';
import Trip from '../../models/trip';

export default Router()
  .post('/', (req, res) => {
    Trip.create(req.body)
      .then(trip => res.json(trip))
      .catch(err => console.error(err));
  })

  .get('/', (req, res) => {
    Trip.find()
      .select()
      .lean()
      .then(trips => res.json(trips))
  })

  .get('/:id', (req, res) => {
    const { id } = req.params;

    Trip.findById(id)
      .then(trip => res.json(trip));
  })
  
  .put('/:id', (req, res) => {
    const { id } = req.params;
    
    Trip.findByIdAndUpdate(id, req.body)
      .then(updatedTrip => res.json(updatedTrip));
  });


