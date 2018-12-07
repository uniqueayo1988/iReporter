const ValidateUpdateLocation = {
  update(req, res, next) {
    if (!req.body.location) {
      return res.status(400).send({ message: 'Location field is required' });
    }

    return next();
  }

};

export default ValidateUpdateLocation;
