// import RedflagModel from '../models/Red-flag';

const ValidateUpdate = {
  update(req, res, next) {
    if (!req.body.comment) {
      return res.status(400).send({ message: 'Comment field is required' });
    }

    if (!req.body.location) {
      return res.status(400).send({ message: 'Location field is required' });
    }

    return next();
  }

};

export default ValidateUpdate;
