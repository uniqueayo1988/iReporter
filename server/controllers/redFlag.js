import db from '../db';

const Redflag = {

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
  },

  /**
   * Get a definite record
   * @param {object} req
   * @param {object} res
   * @returns {object} a single record
   */
  async getOne(req, res) {
    const text = `SELECT * FROM incidents WHERE id = $1 AND createdBy = $2 AND type = 'redFlag'`;
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      const recordDetails = rows[0];
      if (!recordDetails) {
        return res.status(404).send({
          status: 404,
          message: 'Red-Flag record not found'
        });
      }
      return res.status(200).send({
        status: 200,
        data: [recordDetails]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Update Red-Flag
   * @param {object} req
   * @param {object} res
   * @returns {object} updated Red-flag
   */
  async updateLocation(req, res) {
    const findOneQuery = `SELECT * FROM incidents WHERE id=$1 AND createdBy = $2 AND type = 'redFlag'`;
    const updateLocationQuery = `UPDATE incidents
      SET location=$1
      WHERE id=$2 AND createdBy = $3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Location record not found'
        });
      }
      const values = [
        req.body.location || rows[0].location,
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateLocationQuery, values);
      const updatedLocation = response.rows[0];
      return res.status(200).send({
        status: 200,
        data: [{
          updatedLocation,
          message: 'Updated Red-flag record\'s location'
        }]
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async updateComment(req, res) {
    const findOneQuery = `SELECT * FROM incidents WHERE id=$1 AND createdBy = $2 AND type = 'redFlag'`;
    const updateCommentQuery = `UPDATE incidents
      SET comment=$1
      WHERE id=$2 AND createdBy = $3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Comment record not found'
        });
      }
      const values = [
        req.body.comment || rows[0].comment,
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateCommentQuery, values);
      const updatedComment = response.rows[0];
      return res.status(200).send({
        status: 200,
        data: [{
          updatedComment,
          message: 'Updated Red-flag record\'s comment'
        }]
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    const deleteQuery = `DELETE FROM incidents WHERE id=$1 AND createdBy = $2 AND type = 'redFlag' returning *`;
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      const deletedRecord = rows[0];
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Red-flag record not found'
        });
      }
      return res.status(200).send({
        status: 200,
        data: [{
          deletedRecord,
          message: 'Red-flag record has been deleted'
        }]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }



};

export default Redflag;
