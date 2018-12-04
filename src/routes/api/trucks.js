import { Router } from 'express';
import Truck from '../../models/truck'
import truck from '../../models/truck';

export default Router()
    .post('/trucks', (req, res) => {
        console.log('post truck req.body', req.body);
        Truck.create(req.body)
            .then(truck => res.json(truck));
    })