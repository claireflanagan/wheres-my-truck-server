import VehicleCheck from '../../models/vehicleCheck';
import { Router } from 'express';

export default Router()
  .post('/', (req, res, next) => {
    VehicleCheck.create(req.body)
      .then(vehicleCheck => res.json(vehicleCheck))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    VehicleCheck.find()
      .lean()
      .then(vehicleCheck => res.json(vehicleCheck))
      .catch(next);
  })

  .get('/vehicleCheck/:truckId', (req, res, next) => {
    VehicleCheck.find()
      .lean()
      .then(vehicleCheck => res.json(vehicleCheck))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    VehicleCheck.findById(id)
      .then(vehicleCheck => res.json(vehicleCheck))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const updatedVehicleCheck = req.body;

    VehicleCheck.findByIdAndUpdate(id, updatedVehicleCheck, { new: true })
      .then(newVehicleCheck => res.json(newVehicleCheck))
      .catch(next);
  });

