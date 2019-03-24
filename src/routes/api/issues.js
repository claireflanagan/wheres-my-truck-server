import Issue from '../../models/issue';
import { Router } from 'express';

export default Router()
  .post('/', (req, res, next) => {
    Issue.create(req.body)
      .then(issue => res.json(issue))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Issue.find()
      .lean()
      .then(issues => res.json(issues))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    Issue.findById(id)
      .then(issue => res.json(issue))
      .catch(next);
  })

  .get('/issue/:truckId', (req, res, next) => {
    Issue.find()
      .lean()
      .then(issues => res.json(issues))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const { dateResolved } = req.body;

    Issue.findByIdAndUpdate(id, { dateResolved }, { new: true })
      .then(updatedIssue => res.json(updatedIssue))
      .catch(next);
  });

