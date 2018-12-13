const Validator = {
  create(req, res, next) {
    if (!req.body.comment && req.body.location) {
      return res.status(400).send({ message: 'Comment field is required' });
    }

    if (!req.body.location && req.body.comment) {
      return res.status(400).send({ message: 'Location field is required' });
    }

    if (!req.body.location && !req.body.comment) {
      return res.status(400).send({ message: 'Location and Comment fields are required' });
    }
    return next();
  },

  getOne(req, res, next) {
    if (!Number.isInteger(Number(req.params.id))) {
      return res.status(404).send({ message: 'Incidents record not found' });
    }
    return next();
  },

  updateComment(req, res, next) {
    if (!req.body.comment) {
      return res.status(400).send({ message: 'Comment field is required' });
    }
    return next();
  },

  updateLocation(req, res, next) {
    if (!req.body.comment) {
      return res.status(400).send({ message: 'Location field is required' });
    }
    return next();
  },

  signUp(req, res, next) {
    if (!req.body.firstname) {
      return res.status(400).send({ message: 'Firstname is required' });
    }

    if (!req.body.lastname) {
      return res.status(400).send({ message: 'Lastname is required' });
    }

    if (!req.body.email) {
      return res.status(400).send({ message: 'Email is required' });
    }

    if (!req.body.phoneNumber) {
      return res.status(400).send({ message: 'Phone no. is required' });
    }

    if (!req.body.username) {
      return res.status(400).send({ message: 'Username is required' });
    }

    return next();
  },

  isValidEmail(req, res, next) {
    const isValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email);
    if (!isValid) {
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }

    return next();
  }

};

export default Validator;

// Email Validation - Cdt: Stackoverflow
