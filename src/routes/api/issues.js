import Issue from '../../models/Issue';
import { Router } from 'express';

export default Router()
  .post('/', (req, res, next) => {
    const {
      reportedDate,
      description,
      truck
    } = req.body;
    Issue.create({
      user: req.user.sub,
      reportedDate,
      description,
      truck
    })
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

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const { resolvedDate } = req.body;

    Issue
      .findByIdAndUpdate(id,
        { resolvedDate },
        { new: true })
      .then(updatedIssue => res.json(updatedIssue))
      .catch(next);
  });
