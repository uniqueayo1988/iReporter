import db from '../db';

const Intervention = {

  /**
   * Create an redFlag record
   * @param {object} req
   * @param {object} res
   * @returns {object} created redFlag record
   */
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
          message: 'Created Red-flag record'
        }]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Get all redFlags records
   * @param {object} req
   * @param {object} res
   * @returns {object} all redFlag records
   */
  async getAll(req, res) {
    const getAllQuery = `SELECT * FROM incidents WHERE createdBy = $1 AND type = 'redFlag'`;
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
  }


};

export default Intervention;
