import { Router } from 'express';
import Truck from '../../models/Truck';
import isAdmin from '../../middleware/isAdmin';

export default Router()
  .post('/', isAdmin, (req, res, next) => {
    const {
      name,
      location,
      vin,
      plates,
      year,
      make,
      model,
      tireSize,
      boughtDate,
      registration,
      insurance
    } = req.body;

    Truck.create({
      name,
      location,
      vin,
      plates,
      year,
      make,
      model,
      tireSize,
      boughtDate,
      registration,
      insurance
    })
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
  });
