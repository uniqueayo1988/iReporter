import db from '../db';

const Intervention = {

  async create(req, res) {
    const createQuery = `INSERT INTO
      incidents(createdOn, createdBy, type, location, image, title, comment)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const thisDay = new Date();
    const values = [
      thisDay,
      req.user.id,
      req.body.type,
      req.body.location,
      req.body.image,
      req.body.title,
      req.body.comment
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const recordDetails = rows[0];
      const Id = recordDetails.id;
      return res.status(201).send({
        status: 201,
        data: [{
          id: Id,
          message: 'Created Intervention record'
        }]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getAll(req, res) {
    const getAllQuery = 'SELECT * FROM incidents WHERE createdBy = $1';
    try {
      const { rows } = await db.query(getAllQuery, [req.user.id]);
      const data = rows;
      return res.status(200).send({
        status: 200,
        data
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getOne(req, res) {
    const text = 'SELECT * FROM incidents WHERE id = $1 AND createdBy = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      const recordDetails = rows[0];
      if (!recordDetails) {
        return res.status(404).send({
          status: 404,
          message: 'Intervention record not found'
        });
      }
      return res.status(200).send({
        status: 200,
        data: [recordDetails]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default Intervention;
