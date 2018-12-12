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
      8,
      req.body.type,
      req.body.location,
      req.body.image,
      req.body.title,
      req.body.comment
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default Intervention;
