import moment from 'moment';
import db from '../db';
// import Helper from './Helper';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async create(req, res) {
    const createQuery = `INSERT INTO
      users(firstname, lastname, othernames, email, phoneNumber, username, registered, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othernames,
      req.body.email,
      req.body.phoneNumber,
      req.body.username,
      moment().format('LLLL'),
      // hashPassword
      req.body.password
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const userDetails = rows[0];
      return res.status(201).send({
        status: 201,
        data: [{
          user: userDetails
        }]
      });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(error);
    }
  }

};

export default User;
