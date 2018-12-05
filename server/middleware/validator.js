import RedflagModel from '../models/Red-flag';

const Validator = {
  create(req, res, next) {
    if (!req.body.location || !req.body.comment) {
      return res.status(400).send({ message: 'Location and comment fields are required' });
    }
    return next();
  },

  getOne(req, res, next) {
    const id = RedflagModel.findOne(req.params.id);
    if (!id) {
      return res.status(404).send({ message: 'Red-flag record not found' });
    }
    return next();
  },

  update(req, res, next) {
    const id = RedflagModel.findOne(req.params.id);
    if (!id) {
      return res.status(404).send({ message: 'Red-flag record not found' });
    }

    if (!req.body.location && !req.body.comment) {
      return res.status(400).send({ message: 'Field can not be blank' });
    }

    return next();
  },

  delete(req, res, next) {
    const id = RedflagModel.findOne(req.params.id);
    if (!id) {
      return res.status(404).send({ message: 'redflag not found' });
    }

    return next();
  }

};

export default Validator;
