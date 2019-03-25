import { Router } from 'express';
import Trip from '../../models/Trip';

export default Router()
  .post('/', (req, res, next) => {
    const {
      truck,
      startDate,
      tripPurpose,
      startLocation
    } = req.body;
    Trip.create({
      user: req.user.sub,
      truck,
      startDate,
      tripPurpose,
      startLocation
    })
      .then(trip => res.json(trip))
      .catch(next);
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

  .get('/trip/:truckId', (req, res, next) => {
    Trip.find()
      .lean()
      .then(trips => res.json(trips))
      .catch(next);
  })
  
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const { endDate, endLocation } = req.body;

    Trip.findByIdAndUpdate(id, { endDate, endLocation }, { new: true })
      .then(updatedTrip => res.json(updatedTrip))
      .catch(next);
  });
