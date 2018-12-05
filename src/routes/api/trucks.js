import { Router } from 'express';
import Truck from '../../models/truck';

export default Router()
    .post('/', (req, res) => {
        console.log('post truck req.body', req.body.name);
        Truck.create(req.body)
            .then(truck => res.json(truck))
            .catch(err => console.error(err)); 
    })

    .get('/', (req, res) => {
        Truck.find()
            .select()
            .lean()
            .then(trucks => res.json(trucks));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Truck.findById(id)
            .then(truck => res.json(truck));
    });