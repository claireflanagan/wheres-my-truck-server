import { Router } from 'express';
import Maintenance from '../../models/maintenance';
import maintenance from '../../models/maintenance';

export default Router()
    .post('/', (req, res) => {
        Maintenance.create(req.body)
            .then(maintenance => res.json(maintenance))
            .catch(err => console.log(err));
    })
