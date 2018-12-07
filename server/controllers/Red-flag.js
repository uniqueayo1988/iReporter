import RedflagModel from '../models/Red-flag';

const Redflag = {
  create(req, res) {
    const redflag = RedflagModel.create(req.body);
    return res.status(201).send({
      status: 201,
      data: [{
        id: redflag.id,
        message: 'Created red-flag record',
        redflag
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
    return res.status(200).send({
      status: 200,
      data: [redflag]
    });
  },

  update(req, res) {
    const redflag = RedflagModel.findOne(req.params.id);
    RedflagModel.update(req.params.id, req.body);
    if (req.body.location && !req.body.comment) {
      return res.status(200).send({
        status: 200,
        data: [{
          id: redflag.id,
          message: 'Updated red-flag record\'s location',
          redflag
        }]
      });
    }

    return res.status(200).send({
      status: 200,
      data: [{
        id: redflag.id,
        message: 'Updated red-flag record\'s comment',
        redflag
      }]
    });
  },

  delete(req, res) {
    const redflag = RedflagModel.findOne(req.params.id);
    RedflagModel.delete(req.params.id);
    return res.status(200).send({
      status: 200,
      data: [{
        id: redflag.id,
        message: 'red-flag record has been deleted'
      }]
    });
  }

};

export default Redflag;
