import Issue from '../../models/issue';
import { Router } from 'express';

export default Router()
  .post('/', (req, res) => {
    Issue.create(req.body)
      .then(issue => res.json(issue))
      .catch(err => console.error(err));
  })