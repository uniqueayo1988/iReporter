import RedflagModel from '../models/Red-flag';

const Redflag = {
  create(req, res) {
    if (!req.body.location || !req.body.comment) {
      return res.status(400).send({ message: 'Location and comment fields are required' });
    }

    const redflag = RedflagModel.create(req.body);
    return res.status(201).send({
      status: 201,
      data: [{
        id: redflag.id,
        message: 'Created red-flag record'
      }]
    });
  },

  getAll(req, res) {
    const redflags = RedflagModel.findAll();
    return res.status(200).send({
      status: 200,
      data: redflags
    });
  },

  getOne(req, res) {
    const redflag = RedflagModel.findOne(req.params.id);
    if (!redflag) {
      return res.status(404).send({ message: 'Red-flag record not found' });
    }

    return res.status(200).send({
      status: 200,
      data: [redflag]
    });
  }

};

export default Redflag;
