import { Router } from 'express';
import Trip from '../../models/trip';

export default Router()
  .post('/', (req,res) => {
    Trip.create(req.body)
      .then(trip => res.json(trip))
      .catch(err => console.error(err));
  })

  .get('/:id', (req, res) => {
    const { id } = req.params;

    Trip.findById(id)
      .then(trip => res.json(trip));
  });
  

