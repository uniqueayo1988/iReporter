import RedflagModel from '../models/Red-flag';

const Validator = {
  create(req, res, next) {
    if (!req.body.comment && req.body.location) {
      return res.status(400).send({ message: 'Comment field is required' });
    }

    if (!req.body.location && req.body.comment) {
      return res.status(400).send({ message: 'Location field is required' });
    }

    if (!req.body.location && !req.body.comment) {
      return res.status(400).send({ message: 'Location and Message fields are required' });
    }
    return next();
  },

  getOne(req, res, next) {
    const id = RedflagModel.findOne(req.params.id);
    if (!id) {
      return res.status(404).send({ message: 'Red-flag record not found' });
    }
    return next();
  }

};

export default Validator;
