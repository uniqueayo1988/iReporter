import db from '../db';

const Intervention = {

  /**
   * Create an intervention record
   * @param {object} req
   * @param {object} res
   * @returns {object} created intervention record
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
      req.file.path,
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

  /**
   * Get all intervention records for a user
   * @param {object} req
   * @param {object} res
   * @returns {object} all intervention records
   */
  async getAll(req, res) {
    const getAllQuery = `SELECT * FROM incidents WHERE createdBy = $1 AND type = 'intervention'`;
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
   * Get all intervention records for all users
   * @param {object} req
   * @param {object} res
   * @returns {object} all intervention records
   */
  async getAllUsers(req, res) {
    const getAllUsersQuery = `SELECT * FROM incidents WHERE type = 'intervention'`;
    try {
      const { rows } = await db.query(getAllUsersQuery);
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
    const text = `SELECT * FROM incidents WHERE id = $1 AND createdBy = $2 AND type = 'intervention'`;
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
  },

    /**
   * Get a definite user record for admin
   * @param {object} req
   * @param {object} res
   * @returns {object} a single record
   */
  async getOneUser(req, res) {
    const text = `SELECT * FROM incidents WHERE id = $1 AND type = 'intervention'`;
    try {
      const { rows } = await db.query(text, [req.params.id]);
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
  },

  /**
   * Update Location
   * @param {object} req
   * @param {object} res
   * @returns {object} updated location
   */
  async updateLocation(req, res) {
    const findOneQuery = `SELECT * FROM incidents WHERE id=$1 AND createdBy = $2 AND type = 'intervention'`;
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
          message: 'Updated Intervention record\'s location'
        }]
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async updateComment(req, res) {
    const findOneQuery = `SELECT * FROM incidents WHERE id=$1 AND createdBy = $2 AND type = 'intervention'`;
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
          message: 'Updated Intervention record\'s comment'
        }]
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async updateStatus(req, res) {
    const findOneQuery = `SELECT * FROM incidents WHERE id=$1 AND type = 'intervention'`;
    const updateStatusQuery = `UPDATE incidents
      SET status=$1
      WHERE id=$2 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Status not found'
        });
      }
      const values = [
        req.body.status || rows[0].status,
        req.params.id
      ];
      const response = await db.query(updateStatusQuery, values);
      const updatedStatus = response.rows[0].id;
      return res.status(200).send({
        status: 200,
        data: [{
          updatedStatus,
          message: 'Updated Intervention record status'
        }]
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    const deleteQuery = `DELETE FROM incidents WHERE id=$1 AND createdBy = $2 AND type = 'intervention' returning *`;
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      const deletedRecord = rows[0];
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Incident record not found'
        });
      }
      return res.status(200).send({
        status: 200,
        data: [{
          deletedRecord,
          message: 'Intervention record has been deleted'
        }]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }


};

export default Intervention;
