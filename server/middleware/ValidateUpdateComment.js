const ValidateUpdateComment = {
  update(req, res, next) {
    if (!req.body.comment) {
      return res.status(400).send({ message: 'Comment field is required' });
    }

    return next();
  }

};

export default ValidateUpdateComment;
